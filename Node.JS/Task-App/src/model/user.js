const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age can not be negative value");
      }
    }
  },
  Email: {
    type: String,
    unique:true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
    trim: true,
    lowercase: true
  },
  Password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().match("Password")) {
        throw new Error("Password can not be password");
      }
    }
  },
  Tokens:[{
      token:{
          type:String,
          required:true
      }
  }]
});

//methods method are accessible on instance aka instance methods.
userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},'thisismanchesterunited');
    user.Tokens=user.Tokens.concat({token});
    await user.save();
    return token;
}


//Statics method are accessible on model aka model methods
userSchema.statics.findByCredentials=async(Email,Password)=>{
    const user=await User.findOne({Email});
    
    if(!user){
        throw new Error('Unable to login');        
    }
    const isMatch=await bcrypt.compare(Password,user.Password);
    if(!isMatch)
    {
        throw new Error('Unable to login');
    }
    return user;
}

//Hash plaint text password before saving.
userSchema.pre('save',async function(next){
    const user=this;
    //console.log('Before saving the document');

    if((user.isModified('Password'))){
        user.Password=await bcrypt.hash(user.Password,8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
