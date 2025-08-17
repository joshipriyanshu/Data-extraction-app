const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");
const Invoice = require("./models/users"); // Import Invoice model

dotenv.config();

const mongoURL = "mongodb://127.0.0.1:27017/newgeminiappdb";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });

const app = express();
const port = 3000;

app.use(cors());

// Multer config
const upload = multer({ dest: "uploads/" });

// 🔹 Utility to safely parse numbers
const parseNumber = (val) => {
  if (!val) return null;
  if (typeof val === "number") return val;
  return parseFloat(String(val).replace(/,/g, "").replace(/[^\d.]/g, ""));
};

app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});

app.post("/test-upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const contents = [
  {
    role: "user",
    parts: [
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: fs.readFileSync(req.file.path, { encoding: "base64" }),
        },
      },
      {
        text: `Extract the following details from the document. Return the data in a single JSON object.
        - invoiceNumber: (string)
        - invoiceDate: (string, format DD/MM/YYYY)
        - City: (string)
        - customer:
          - name: (string)
          - address: (string)
          - mobile: (string)
        - itemDetails: (array of objects)
          - each item should have 'description' (string), 'quantity' (number), 'unitPrice' (number), and 'total' (number)
        - total: (number)
        - tax: (object with CGST, SGST, and totalTax, all as numbers)
        - bankDetails: (object with bankName, accountNumber, and ifscCode, all as strings)
        - CGST_percentage: (string)
        - SGST_percentage: (string)

        Return only the JSON object, do not include any other text or markdown.`
      },
    ],
  },
];


    // 🔹 Call Gemini
    const result = await model.generateContent({ contents });
    const text = result.response.text();

    let extractedData;
    try {
      extractedData = JSON.parse(text);
    } catch (err) {
      console.error("❌ Error parsing JSON:", err);
      return res.status(500).json({
        message: "AI returned invalid JSON.",
        raw: text,
      });
    }

    // Clean tax values safely
    let taxToSave = extractedData.tax;
    if (taxToSave && typeof taxToSave === "object") {
      ["IGST", "CGST", "SGST"].forEach((key) => {
        if (taxToSave[key]) {
          taxToSave[key] = parseNumber(taxToSave[key]); // cleaned
        }
      });
    } else {
      taxToSave = undefined;
    }

    // ✅ Save to MongoDB using Invoice schema
    const invoiceData = new Invoice({
      invoiceNumber: extractedData.invoiceNumber || "Not provided",
      invoiceDate: extractedData.invoiceDate || "Not provided",
      placeOfSupply: extractedData.placeOfSupply || "Not provided",
      city: extractedData.city || "Not provided",

      customer: {
        name: extractedData.customer?.name || "Not provided",
        phone: extractedData.customer?.mobile || "Not provided",
        email: extractedData.customer?.email || null,
        address: extractedData.customer?.address || "Not provided",
      },

      seller: {
        gstin: extractedData.seller?.gstin || null,
        companyName: extractedData.seller?.companyName || null,
        companyAddress: extractedData.seller?.companyAddress || null,
        mobile: extractedData.seller?.mobile || null,
        email: extractedData.seller?.email || null,
      },

      items: extractedData.itemDetails || [],

      tax: taxToSave,

      totals: {
        totalAmount: parseNumber(extractedData.total), // cleaned
        amountInWords: extractedData.amountInWords || null,
        balanceDue: parseNumber(extractedData.balanceDue), // cleaned
      },

      bankDetails: extractedData.bankDetails || {},

      notes: extractedData.notes || null,
      terms: extractedData.terms || null,
    });

    await invoiceData.save();
    console.log("✅ Invoice saved to MongoDB:", invoiceData);

    return res.json({ success: true, data: invoiceData });
  } catch (error) {
    console.error("❌ Error during AI model processing:", error);
    return res.status(500).json({
      message: "AI model processing failed.",
      error: error.message,
    });
  }
});

// List of users (invoices)
app.get("/users", async (req, res) => {
  try {
    const invoices = await Invoice.find({}); // use the Invoice model
    res.json(invoices);
  } catch (err) {
    console.error("❌ Error fetching invoices:", err);
    res.status(500).json({ message: "Error fetching invoices." });
  }
});



app.listen(port, () => {
  console.log(`🚀 App listening on port ${port}`);
});
