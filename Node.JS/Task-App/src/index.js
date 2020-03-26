const express=require('express');
require('./db/mongoose');
const User=require('./model/user');
const Task=require('./model/task');

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());

app.post('/users',async(req,res)=>{
    const user=new User(req.body);

    //Using async await
    try {
        await user.save();
        res.status(201).send(user);
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

app.get('/users',async (req,res)=>{
    
    //Using async await
    try {
        const users=await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }

    //Without using async await
    // User.find({}).then((users)=>{
    //     res.status(200).send(users); 
    // }).catch((error)=>{
    //     res.status(500).send(error);
    // });
})

app.get('/users/:id',async(req,res)=>{
    const _id =req.params.id;

    //With using async await
    try {
        const user=await User.findById(_id);
        if(!user){
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


app.post('/tasks',async(req,res)=>{
    const task=new Task(req.body);
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


app.get('/tasks',async(req,res)=>{
    
    //With using async await
    try {
        const tasks=await Task.find({});
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

app.get('/tasks/:id',async(req,res)=>{
    const _id =req.params.id;
    //With using async await 
    try {
        const task=await Task.findById(_id);
        if(!task)
        {
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

app.listen(PORT,()=>{
    console.log('Server is listening on '+PORT);
});


/*
1** Informational
2** Success
    200 Ok
    201 Created
    202 Accepted    
3** Redirection
4** Client side Error
    400 Bad Request
    401 Unauthorised
    403 Forbidden
    404 Not Found
    405 Method not allowed
5** Server side Error
    500 Internal Server Error
    501 Not implemented
    502 Bad Gateway
    503 Service Unavailble
*/