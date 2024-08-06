import mongoose from "mongoose";

const lostAmtSchema=mongoose.Schema({
    amt:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    gameId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GameData"
    }
})


export const lostAmt=mongoose.model("LostAmt",lostAmtSchema);