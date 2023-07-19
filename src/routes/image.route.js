const express = require('express');
const { imageController } = require('../controllers');
const multer = require('multer');
const { ImageModel } = require('../models');
const router = express.Router();


const storage =  multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'../frontend/public/uploads/');
  },
  filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,'chary-'+fileName)
  }
})
const upload = multer({
  storage:storage,
  fileFilter:(req,file,cb)=>{
    if(file.mimetype=="image/png" || file.mimetype=="image/jpeg" || file.mimetype=="image/jpg"){
      cb(null,true);
    }else{
      cb(null,false);
      return cb(new Error('only jpeg, jpg  and png images are allowed'));
    }
  }
})

router 
  .route('/upload')
  .post(upload.single('image'),(req,res,next)=>{
    console.log(JSON.parse(req.body.body));
    const newImage =  new ImageModel({
      name:req.body.name,
      image:'./uploads/'+ req.file.filename
    })
    newImage.save()
    .then((result)=>{
      res.status(201).json({
        message:"image uploaded successfully",
        image:result.image
      })
    }).catch((err)=>{
      console.log("error",error);
      res.status(400).json({message:'not uploaded succesfully'});
    })
  });

router
  .route('/get')
  .get(imageController.getImages)

router
  .route('/delete')
  .get(async(req,res)=>{
    await ImageModel.deleteMany();
    res.json({message:"deleted all images"})
  })
module.exports = router;