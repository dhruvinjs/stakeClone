import mongoose from "mongoose";

const dailyBetSchema=mongoose.Schema({
    lotterynum:{
        type:Number
    },
    profit:{
        type:Number,
        required:true
    },
    loss:{
        type:Number,
        required:true
    },
    betted:{
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
},{timestamps:true})


export const GnumDailyBets=mongoose.model("GnumDailyBets",dailyBetSchema);