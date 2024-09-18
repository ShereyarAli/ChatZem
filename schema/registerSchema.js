const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({  
  name:{
    type:String,
    required:[true, 'Please provide a name']
  },
  email:{
    type:String,
    required:[true, 'Please provide a valid email address'],
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'
    ],
    unique: [true,'Email already exist'],
    lowercase: true
  },
  password:{
    type:String,
    required:[true, 'Please provide a password']
  },
  verified:{
    type:Boolean,
    default:false,
  }
})

userSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id, userName:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports = mongoose.model('User', userSchema)