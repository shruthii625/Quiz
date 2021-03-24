const express = require("express");
const cors = require("cors");
const multer = require("multer")
const mongoose = require("mongoose");

require("dotenv").config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) =>{
        const { originalname } = file;
        cb(null, originalname);
    }
})
const upload = multer({storage});

const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.static('public'));


app.post('/upload', upload.single("quizques"),(req, res) =>{
    return res.json({status:'OK'});
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server started"));


mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology : true}, err=>{
    if(err) {console.log("J");return console.error(err);} 
    console.log("MongoDB connection successful");
});