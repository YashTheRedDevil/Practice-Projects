const mongoose=require('mongoose');
const validator=require('validator');

const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true    
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age can not be negative value');
            }
        }
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        },
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().match('password')){
                throw new Error('Password can not be password');
            }
        }    
    }
});


module.exports=User;