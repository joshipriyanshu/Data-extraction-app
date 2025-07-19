const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const multer = require("multer");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// const upload = multer({ dest: "uploads/" });
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
        // Create the uploads directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
    });

    const upload = multer({ storage: storage });



function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}


app.post("/upload", upload.single("file"), async (req, res) => {
     if (!req.file) {
    console.log('No file received from client.');
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = req.file.path;
  const mimeType = req.file.mimetype;


  try {
    // Ensure the uploaded file is accessible   
     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const ai = new GoogleGenAI({geminiApiKey});
   
    const contents = [
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64ImageFile,
        },
      },
      { text: "Explain this image." },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    console.log(response.text);
    res.send(response.text); // Send the AI explanation back to the client
  } catch (error) {
    console.error("Upload or AI processing failed:", error);
    res.status(500).send("An error occurred while processing the file.");
  }
});



app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
