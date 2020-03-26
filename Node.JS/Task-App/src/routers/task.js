const express = require("express");
const Task = require("../model/task");
const router = express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
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

router.get("/tasks", async (req, res) => {
  //With using async await
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
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

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  //With using async await
  try {
    const task = await Task.findById(_id);
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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Description", "Completed"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send("Invalid update");
  }
  console.log(req.body);
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });
    //console.log(task);
    if (!task) {
      return res.status(404).send(task);
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send(task);
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
