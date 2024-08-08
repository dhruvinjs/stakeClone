import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  age: {
    required: [true, "Age must be over 18"],
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
  
    required: true,
    lowercase: true,
    index: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    index: true,
  }, 
  
  password: {
    type: String,
    required: true,
  },
 
  refreshToken: {
    type: String,
  },
  invested:{
   
      type: Number,
    default:0,
  },
  betted:{
    type: Number,
    default:0,
  },
  
  winning: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

userSchema.pre('save',async function (next) {
if(!this.isModified('password') && !this.isModified('confirmPassword') )
{
  return next();
}
// if(this.password !== this.confirmPassword){
//   throw new Error("Password and Confirm Password does not match");
// }
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(this.password, saltRounds);
console.log(`Hashed password: ${hashedPassword}`);
this.password = hashedPassword;
next();

})
// userSchema.pre('save', async function (next) {
  
//   if (!this.isModified('password')) return next();
//   const saltRounds = 12;
//   const hashedPassword = await bcrypt.hash(this.password, saltRounds);
//   console.log(`Hashed password: ${hashedPassword}`);
//   this.password = hashedPassword;
//   next();
// });

// Method to check password (instance method)
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating JWT access token
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
        
          username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

userSchema.methods.generatePassAccesstoken=function (){
  return jwt.sign({
    email:this.email,
    _id:this._id
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:"10m"
  })
}


export const User = mongoose.model("User", userSchema)