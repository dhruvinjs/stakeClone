import mongoose from "mongoose";


const winAmtSchema=mongoose.Schema({
    amt:{
        type:Number,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    gameName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GamesData"
    }
})

export const winAmt=mongoose.model("WinAmt",winAmtSchema) 