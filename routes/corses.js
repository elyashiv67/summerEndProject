const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


let corses = [];
let nextID = 1;

if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    let id = req.params.id ? req.params.id : nextID;
    let finalFilename = `${id}${path.extname(file.originalname)}`;
    cb(null, finalFilename);
  }
});
const upload = multer({ storage: storage });


router.get('/',(req,res)=>{
    res.json(corses);
})





module.exports = router;