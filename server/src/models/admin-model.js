import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    age: {
      required: true,
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    country:{
        type: String,
      
        required: true,
        lowercase: true,
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
    
  }, { timestamps: true });

adminSchema.pre("save",async function (next) {
    if(!this.isModified('password')  )

 await bcrypt.hash(this.password,12)
        next()
});

adminSchema.methods.comparePassword=async function(password){
await bcrypt.compare('password',this.password);
return true;
}

adminSchema.methods.generateRefToken=async function(){
 return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:'6h'
},    
)
}

export const Admin=mongoose.model("Admin",adminSchema);
