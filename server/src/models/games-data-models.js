import mongoose from "mongoose";
import { Schema } from "mongoose";
// import { asyncHandler } from "../utils/asynchandler";
import jsonwebtoken from "jsonwebtoken";

const gameDataSchema=new mongoose.Schema({
gameid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"  // Ensure this matches the exact model name
  },
    id:{
      type:Number,
  
    },
  gameName: {
    type: String,
    required: true
  },
profit:{
  type:Number,
  required:true,
  default:0
},
loss:{
  type:Number,
  required:true,
  default:0
},
betted:{
  type:Number,
  required:true,
  default:0,
},
// playedby:{
// type:mongo.Schema.Types.ObjectId,
// ref:"User",

// },
investment:{
  type:Number,
  required:true,
  default:0
},
refreshToken:{
  type:String
},
dailybets:[
  {user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
amt:{type:Number},
date:{type:Date,default:Date.now}
  }
]
},{timestamps:true})

gameDataSchema.methods.generateGameToken=function(){
return jsonwebtoken.sign(
  {
    _id: this._id, 
  gameName:this.gameName,
}
,process.env.ACCESS_TOKEN_SECRET,
{
  expiresIn:"2h",
},
)
}

gameDataSchema.methods.generaterefreshToken=function(){
  return jsonwebtoken.sign(
    {
    id:this._id,
    
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:"6h",
  },
  )
  }
  


export const GamesData=new mongoose.model("GamesData",gameDataSchema)
