const express = require("express");
const Task = require("../model/task");
const auth=require('../middleware/authentication');
const router = express.Router();

router.post("/tasks",auth, async (req, res) => {  
  const task=new Task({
    ...req.body, //ES6 spread operator 
    Owner:req.user._id
  });

  //With using async await
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  //Without using async await
  // task.save().then(()=>{
  //     res.status(201).send(task);
  // }).catch((error)=>{
  //     res.status(400).send(error);
  // })
});

//GET tasks?completed=true
//GET tasks?limit=10&skip=1
router.get("/tasks",auth, async (req, res) => {
  
  const match={};
  
  if(req.query.completed)
  {
    match.Completed=req.query.completed==='true'?true:false;
  }
  //With using async await
  try {
    //const tasks = await Task.find({Owner:req.User._id});
    //OR
    await req.user.populate({
      path:'Tasks',
      match:match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip)
      }
    }).execPopulate();
    res.status(200).send(req.user.Tasks);
  } catch (error) {
    res.status(500).send(error);
  }

  //Without using async await
  // Task.find({}).then((tasks)=>{
  //     res.status(200).send(tasks);
  // }).catch((error)=>{
  //     res.status(500).send();
  // });
});

router.get("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;
  //With using async await
  try {    
    const task=await Task.findOne({_id,Owner:req.user._id});
    if (!task) {
      return res.status(404).send(task);
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }

  //Without using async await
  // Task.findById(_id).then((tasks)=>{
  //     if(!tasks){
  //         return res.status(404).send();
  //     }
  //     res.status(200).send(tasks);
  // }).catch((error)=>{
  //     res.status(500).send();
  // });
});

router.patch("/tasks/:id",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Description", "Completed"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send("Invalid update");
  }  
  const _id = req.params.id;
  try {
    const task=await Task.findOne({_id,Owner:req.user._id});
        
    if (!task) {
      return res.status(404).send(task);
    }
    updates.forEach((update)=>{
      task[update]=req.body[update];
    })

    await task.save();

    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndDelete({_id,Owner:req.user._id});
    
    if (!task) {
      return res.status(404).send(task);
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
