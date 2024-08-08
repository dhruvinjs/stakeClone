import mongo from "mongoose"

const gameSchema=new mongo.Schema({
  //this schema will contain the vast data of all games 
  //profit aand loss of all games
  betted: {
    type: Number,
    default: 0
  },
  //profit and loss of all games
  profit: {
    type: Number,
    default: 0
  },
  loss: {
    type: Number,
    default: 0
  },
  gameData:[{ 
    type:mongo.Schema.Types.ObjectId,
    ref:"Gamesdata"
  }]//array of sub games
})
export const Game=mongo.model("Game",gameSchema)