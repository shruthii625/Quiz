require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const {
  Round1conversion,
  Round2conversion,
  Round3conversion,
} = require("./exceltojson");
const mongo_oper = require("./mongodb_operations");
const { response, urlencoded } = require("express");
const connect = require("./models/db");
const Round1 = require("./models/Round1model");
const Round2 = require("./models/Round2model");
const Round3 = require("./models/Round3model");
const StudentResponse = require("./models/StudentResponseModel");
const cookie = require("cookie");
const fs = require("fs");
const https = require("https");
var request = require("request");
const app = express();
var loggedin = "false";
//var studentdetails = {};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  },
});
const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use("/admins", express.static("admin"));

function isLoggedIn(req, res, next) {
  if (loggedin == "true") {
    return next();
  } else {
    res.redirect("/");
  }
}

app.get("/admins/adminhome", isLoggedIn, (req, res) => {
  res.redirect("admin.html");
});

app.post("/login", (req, res) => {
  if (
    req.body.username == process.env.USER_NAME &&
    req.body.password == process.env.PASSWORD
  ) {
    loggedin = "true";
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("name", "admin", {
        maxAge: 30 * 30 * 30,
      })
    );
    res.redirect("/admins/adminhome");
  } else {
    res.redirect("/");
  }
});



app.post(
  "/admins/onupload",
  isLoggedIn,
  upload.single("quizques"),
  (req, res) => {
  
    converted_data1 = Round1conversion(req.file.filename);
    converted_data2 = Round2conversion(req.file.filename);
    converted_data3 = Round3conversion(req.file.filename);
  p1 =  Round1.create(converted_data1).then(function () {
      mongo_oper
        .first(connect.getConnection, converted_data1)
    });
  p2=  Round2.create(converted_data2).then(function (round2) {
      mongo_oper
        .Round2insert(connect.getConnection, converted_data2)
    });
   p3= Round3.create(converted_data2).then(function (round3) {
      mongo_oper
        .Round3insert(connect.getConnection, converted_data3)
    });

  Promise.all([p1,p2,p3]).then(res.redirect("admin.html"));
       
      });
   


app.get("/takequiz", (req, res) => {	
  mongo_oper
    .second(connect.getConnection)
    .then(function (r) {
      console.log((r))
      res.json(r);
    })
    .catch(function (err) {
      res.send(err);
    });
});


app.get("/takeround2", (req, res) => {
  mongo_oper
    .getRound2Questions(connect.getConnection)
    .then(function (r) {
      res.json(r);
    })
    .catch(function (err) {
      res.send(err);
    });
});
app.get("/takeround3", (req, res) => {
  mongo_oper
    .getRound3Questions(connect.getConnection)
    .then(function (r) {
     
      res.json(r);
    })
    .catch(function (err) {
      res.send(err);
    });
});

app.post("/round3", (req, res) => {
 
  studentdetails=JSON.parse(JSON.stringify(req.body));

  StudentResponse.create(studentdetails).then(function () {
    mongo_oper
      .insertStudentResponse(connect.getConnection, studentdetails)
      
  }).then(res.sendStatus(req.body));

});

app.get('/registrationdone',(req, res)=>{
  res.redirect("instructions.html");
})

app.get("/admins/mailresponse", (req, res) => {
  fs.open('finalresponse.csv', 'w', function (err, file) {
    if (err) throw err;
  
  });
  mongo_oper
  .getStudentResponse(connect.getConnection)
  .then(function (r) {
   var titles = JSON.stringify(r[0]).substring(1).split(",");
   data = "";
   titles.forEach(title => {
    data+=title.split(":")[0]+",";
   })
   fs.appendFileSync('finalresponse.csv',data+"\n\n");
   r.forEach(response =>{
     var response = JSON.stringify(response);
     response = response.substring(0, response.length-1).split(",");
     data = "";
     response.forEach(ele =>{
       data+=ele.split(":")[1]+",";
     })
    fs.appendFileSync('finalresponse.csv',data+"\n");
   });
   res.download("finalresponse.csv")
   
  })
  .catch(function (err) {
    res.send(err);
  });
 
});
app.get('/admins/del',(req, res)=>{
  
mongo_oper.deleteStudentResponse(connect.getConnection).then( function(result) {
  res.send(result)
}).catch(function (err) {
  res.send(err);
});

});  
app.get('/logout',(req,res)=>{
  res.clearCookie("name");
  loggedin="false";
  res.redirect('/');
})
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server started"));
