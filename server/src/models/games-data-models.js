import mongo from "mongoose"
// import { asyncHandler } from "../utils/asynchandler";
import jsonwebtoken from "jsonwebtoken"

const gameDataSchema=new mongo.Schema({
gameName:{
  type:String,
},//special id for games
id:{
  type:Number
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
type:mongo.Schema.Types.ObjectId,
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
  id:this.id,
  gameName:this.gameName,
}
,process.env.ACCESS_TOKEN_SECRET,
{
  expiresIn:"5m",
},
)
}

gameDataSchema.methods.generaterefreshToken=function(){
  return jsonwebtoken.sign(
    {
    id:this.id,
    
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:"6h",
  },
  )
  }
  


export const GamesData=new mongo.model("GamesData",gameDataSchema)
