const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Task=require('./task');

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
      Token:{
          type:String,
          required:true
      }
  }],
  avatar:{
    type:Buffer
  }
},{
    timestamps:true
});


userSchema.virtual('Tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'Owner'
});

//methods method are accessible on instance aka instance methods.

userSchema.methods.toJSON= function(){
    const user=this;
    const userObject=user.toObject();
    
    delete userObject.Password;
    delete userObject.Tokens;
    delete userObject.avatar;
    
    return userObject;
}

//OR

// userSchema.methods.getPublicProfile= function(){
//     const user=this;
//     const userObject=user.toObject();
//     console.log(userObject);
//     delete userObject.Password;
//     delete userObject.Tokens;
//     console.log(userObject); 
//     return userObject;
// }


userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.Tokens=user.Tokens.concat({Token:token});
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

//Delete user task when user is removed
userSchema.pre('remove',async function(next){
    const user=this;
    await Task.deleteMany({Owner:user._id});
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
