import mongoose from "mongoose";

import { User } from "./user.model";
const walletSchema=mongoose.Schema({
    investment:{
    
            type:Number,
            required:true,
            default:0
          },
eachGameInv:{
    //will contain the data of our inv to each game   
      type:mongoose.Schema.Types.ObjectId,
      ref:"GamesData"
},
})