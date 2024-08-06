import mongo from "mongoose"

const gameDataSchema=new mongo.Schema({
gameName:{
  type:String,
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
playedby:{
type:mongo.Schema.Types.ObjectId,
ref:"User",

},

},{timestamps:true})

export const GamesData=new mongo.model("GamesData",gameDataSchema)
