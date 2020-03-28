const express = require("express");
const User=require('../model/user');
const auth=require('../middleware/authentication')
const router = express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  //Using async await
  try {    
    await user.save();
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
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send(user);
    // }
    
    //OR
    await req.user.remove()
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;