const mongoose=require('mongoose');
const validator=require('validator');


const Task=mongoose.model('Task',{
    'Description':{
        type:String,
        required:true,
        trim:true
    },
    'Completed':{
        type:Boolean,
        default:false
    }
});

module.exports=Task;
