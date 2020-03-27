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
    res.status(201).send({user,token});
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
    res.status(200).send({user,token});
  } catch (error) {
      res.status(400).send();
  }
});

router.get("/users/me", auth,async (req, res) => {    
  res.status(200).send(req.user);  
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  //With using async await
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send(user);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }

  //Without using async await
  // User.findById(_id).then((user)=>{
  //     if(!user)
  //     {
  //         return res.status(404).send();
  //     }
  //     res.status(200).send(user);
  // }).catch((error)=>{
  //     res.status(500).send(error);
  // });
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Name", "Age", "Email", "Password"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send("Invalid update");
  }

  const _id = req.params.id;
  try {

    const user=await User.findById(_id);

    updates.forEach((update)=>{
      user[update]=req.body[update];
    });

    await user.save();
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true
    // });


    if (!user) {
      return res.status(404).send(user);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send(user);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;