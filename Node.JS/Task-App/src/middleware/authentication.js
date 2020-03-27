const jwt=require('jsonwebtoken');
const User=require('../model/user');

const auth=async(req,res,next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ','');
        const decoded=jwt.verify(token,'thisismanchesterunited');
        console.log(token,decoded);
        const user=await User.findOne({_id:decoded._id,'Tokens.Token':token});        
        if(!user)
        {
            throw new Error();
        }
        req.user=user;
        next();
    } catch (error) {
        res.status(403).send('Unauthenticated request');
    }
};


module.exports=auth;

//
//Without middleware: new request ->run route handler
//
//With middleware:    new request -> run some code -> run route handler
//
