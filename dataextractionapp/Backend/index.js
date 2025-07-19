const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");
const user = require("./Models/users"); // Import the user model
const { emit } = require("process");

const mongoURL =  'mongodb://127.0.0.1:27017/newgeminiappdb'

mongoose.connect(mongoURL)
.then(() => {
  console.log("Connected to MongoDB"); } 
).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());


const upload = multer({ dest: "uploads/" });


app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});

app.post("/upload", upload.single("files"), async (req, res) => {  
  if (!req.file) {  
    console.log("No file received from client.");
    return res.status(400).json({ message: "No file uploaded." });
  }
  try {
    const ai = new GoogleGenerativeAI('AIzaSyD9IKqazh0KVED1s1kPuGQcQ4d9OIo1NDo'); // ✅ FIXED
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash",

      generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: { // Define your expected JSON schema here
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          mobile: { type: 'number'},
          workExperience: { type: 'string' }, 
          address: { type: 'string' } // Optional field 
        },
        required: ['name', 'email', 'mobile']
      }
    },


     }); // ✅ FIXED
        
    

    const contents = [
  {
    parts: [ 
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: fs.readFileSync(req.file.path, { encoding: "base64" }),
        },
      },
      { text: "Please get the name, mobile and email, address from the given file and also find the latest job profile." },
    ],
  },
];

    const result = await model.generateContent({ contents });
    console.log("AI processing result:", result);
    const response =  result.response;
    const text = response.text();
    let extractedData;
    try{
      extractedData= JSON.parse(text); // Parse the JSON response} 
      console.log("successfully parsed JSON:", extractedData);
    } catch (error) { ("error parsing JSON:", error);
      return res.status(500).json({ message: "Error parsing AI response.", error: error.message });
    } 
    // Save user data to MongoDB
    const userData = new user({ 
      name: extractedData.name ,
      email: extractedData.email ,
      mobile: extractedData .mobile ,
      workExperience: extractedData.workExperience || "Not provided", // Optional field
      address: extractedData.address || "Not provided", // Optional field

    })

    await userData.save();
    console.log("User data saved to MongoDB:", userData);

    // <--- End of Mongodb save -->

    res.json({ message: "data extracted successfully", name: extractedData.name, email: extractedData.email, mobile: extractedData.mobile });
  } catch (error) {
    console.error("Upload or AI processing failed:", error);
    res.status(500).json({ message: "AI processing failed.", error: error.message });
  }


 })

 
 //  List of users
app.get("/users", async (req, res) => { 
  userData = await user.find({});
  res.json(userData); })



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
