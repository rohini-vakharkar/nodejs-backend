const express = require("express");
const fileupload = express.Router();
const db = require("../database");
const app = express();
// const File = require("./upload");

const path = require("path");
const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, ".s/images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "-" + Date.now());
//   },
// });

// var upload = multer({ storage: storage });

// app.post("/images", upload.single("files"), function (req, res) {
//   console.log("reqqq".req.file)
// });

// const upload = multer({ dest: "upload/" })
// fileupload.post("/image", upload.single("files"), (req, res) => {
//   upload(req, res=> {
//     // if (err) {
//     //   res.status(400).send("Something went wrong!");
//     // }
//     console.log("reqqqqqq", req.file);
//     res.send(req.file);
//   });
// });
//setting Storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../controller/upload");
//   },
//   filename: (req, file, cb) => {
//     console.log("file"), file;
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "controller");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not a PDF File!!"), false);
//   }
// };
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// //Initialize Multer
// const uploadStorage = multer({ storage: storage });

// fileupload.post("/upload", uploadStorage.single("files"), (req, res) => {
//   console.log("reqqqqqqqq", req.file);
//   // return res.send("Multiple files");
//   // if (req.file) {
//   //   res.send("Multiple files");
//   // }
// });
// const upload = multer({ dest: "./images" });
//setting Storage
const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./images/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
});

// var Multiple=upload.fields([{name:'files', maxCount:1},{name:'file1',maxCount:4}])

// fileupload.post("/images", upload.Multiple, async (req, res) => {
//   console.log("req====", req.file);
//   try {
//     // const newFile = await File.create({
//     //   name: req.file.filename,
//     // });
//     if(req.files){
//       console.log("reqqqq", req.file);

//       res.status(200).json({
//         status: "success",
//         message: "File created successfully!!",
//       });
//     }

//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
//   // console.log("reqqqq", req.file);
//   var file = req.file;
//   res.end();
//   // console.log("req=====", req.file);
// });
fileupload.post("/images", upload.single("files"), async (req, res) => {
  console.log("req====", req.file);
  try {
    // const newFile = await File.create({
    //   name: req.file.filename,
    // });

    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
  // console.log("reqqqq", req.file);
  var file = req.file;
  res.end();
  // console.log("req=====", req.file);
});
module.exports = fileupload;
