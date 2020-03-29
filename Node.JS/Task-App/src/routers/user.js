const express = require("express");
const multer=require('multer');
const sharp=require('sharp');
const User=require('../model/user');
const auth=require('../middleware/authentication')
const {sendWelcomeMail,sendFeedbackMail}=require('../emails/account')
const router = express.Router();

const upload=multer({
  limits:{
    fileSize:1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpeg|png|jpg)$/)){
      return cb(new Error('Please upload a jpg or png format'));
    }
    cb(undefined,true);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  //Using async await
  try {    
    await user.save();
    sendWelcomeMail(user.Email,user.Name);
    const token=await user.generateAuthToken();
    //console.log(token,user);
    res.status(201).send({user,Token:token});
  } catch (error) {
    res.status(400).send(error);
  }

  //Without async await
  // user.save().then((result)=>{
  //     console.log(user);
  //     res.status(201).send(user);
  // }).catch((error)=>{
  //     console.log(error);
  //     res.status(400).send(error);
  // });
});


router.post('/users/login',async(req,res)=>{
  try {
    const user=await User.findByCredentials(req.body.Email,req.body.Password);
    const token=await user.generateAuthToken();
    res.status(200).send({user,Token:token});
    //OR
    //res.status(200).send({user:user.getPublicProfile(),Token:token});
  } catch (error) {
      res.status(400).send();
  }
});


router.post('/users/logout',auth,async(req,res)=>{
  try {    
    req.user.Tokens=req.user.Tokens.filter((token)=>{
      return token.Token!==req.Token;
    })    
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll',auth,async(req,res)=>{
  try {
     req.user.Tokens=[];
     await req.user.save();
     res.status(200).send();
  } catch (error) {
    res.status(500).send();
  } 
});

router.get("/users/me", auth,async (req, res) => {    
  res.status(200).send(req.user);  
});


router.patch("/users/me",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Name", "Age", "Email", "Password"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send("Invalid update");
  }
  
  try {  
    updates.forEach((update)=>{
      req.user[update]=req.body[update];
    });
    await req.user.save();    
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me",auth, async (req, res) => {  

  try {
    await req.user.remove();
    sendFeedbackMail(req.user.Email,req.user.Name);
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
  const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
  req.user.avatar=buffer;
  await req.user.save();
  res.send();
},(error,req,res,next)=>{
  res.status(400).send({error:error.message});
});


router.delete('/users/avatar/me',auth,async (req,res)=>{  
  req.user.avatar=undefined;
  await req.user.save();
  res.status(200).send();  
},(error,req,res,next)=>{
  res.status(400).send({error:error.message});
});


router.get('/users/:id/avatar',async (req,res)=>{
  try {
    const user=await User.findById(req.params._id);
    if(!user || !user.avatar){
      throw new Error();
    }
    res.set('Content-Type','image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;