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

router.post('/',upload.single('myFile'),(req,res)=>{
  let name = req.body.name;
  if(!name){
     return res.json({message:"please enter a valid text"});
  }
let id = nextID++;
let description = req.body.description;
let rating = [];
let filename = req.file? req.file.filename: null;
let cours = {id,name,rating,description,filename};
corses[id] = cours;
res.json({message:"ok"});
})

router.delete('/:id',(req,res)=>{
   let currentId = Number(req.params.id);
  
   if(isNaN(currentId)){
      return res.json({message:"id is not valid"});
   }
  
   let corse = corses[currentId];
  
   if(!corse){
          return res.json({message:"not exist"});
      }
  corses[currentId] = null;
  if(corse.filename){
  if(fs.existsSync(path.join('images',corse.filename))){
      fs.unlinkSync(path.join('images',corse.filename));
  }
  }
  
  res.json({message:"this item deleted"});
})

router.get('/:id',(req,res)=>{
  let id = Number(req.params.id);
  if(isNaN(id)){
    return res.json({message:"id is illegal"})
  }
  let corse = corses[id];
  if(!corse){
    return res.json("not exsist")
  }
  res.json(corse);
})



router.patch('/:id',upload.single('myFile'),(req,res)=>{
      let id = Number(req.params.id);
  
   if(isNaN(id)){
      return res.json({message:"id is not valid"});
   }
  
   let corse = corses[id];
  
   if(!corse){
          return res.json({message:"not exist"});
      };
  
      let oldFileName = corse.filename;
      let newFileName = req.file ? req.file.filename : null;
  
      if(oldFileName && newFileName && newFileName !== oldFileName){
          if(fs.existsSync(path.join('images',oldFileName))){
             fs.unlinkSync(path.join('images',oldFileName));
          }
          product.filename = newFileName;
      }
   
   let name = req.body.name;
   // let rating = parseFloat(req.body.rating);
   if(name) corse.name = name;
   // if(rating) corse.rating = rating;
  
   res.json({message:"updated"});
  
})

router.patch('/L/:id',(req,res)=>{
   let id = Number(req.params.id);

   if(isNaN(id)){
      return res.json({message:"id is not valid"});
   }

   let corse = corses[id];

   if(!corse){
          return res.json({message:"not exist"});
      };

   let currentIP = req.ip;
   

   if(corse.rating.includes(currentIP)){
      return  res.json({message:"already exist"});
   }

   corse.rating.push(currentIP);
   res.json({message:"updated"});
})





module.exports = router;