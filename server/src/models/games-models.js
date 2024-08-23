import mongoose from 'mongoose';

const gameSchema=new mongoose.Schema({
  //this schema will contain the vast data of all games 
  //profit aand loss of all games
  betted: {
    type: Number,
    default: 0
  },
  //profit and loss of all games
  profit: {
type:Number,
default:0
  },
  loss: {
    type: Number,
    default: 0
  },
 gameData: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "GamesData"//Reference of Games data becasue one point or primary key should be there to perform tha join on the table
  }]//array of sub games
})
export const Game=mongoose.model("Game",gameSchema)