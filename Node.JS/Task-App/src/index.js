const express=require('express');
require('./db/mongoose');
const User=require('./model/user');
const Task=require('./model/task');

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());

app.post('/users',(req,res)=>{
    const user=new User(req.body);
    user.save().then((result)=>{
        console.log(user);
        res.send(user);
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);        
    });    
});

app.post('/tasks',(req,res)=>{
    const task=new Task(req.body);
    task.save().then((result)=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    })
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