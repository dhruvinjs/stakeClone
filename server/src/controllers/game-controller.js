import {asyncHandler} from '../utils/asynchandler.js';
import { User } from '../models/users.js';
import { GamesData } from '../models/games-data-models.js';
import { Game } from '../models/games-models.js';
import { ApiError } from '../utils/api-error.js';
import {ApiRes} from '../utils/api-res.js';
// import crypto from "crypto-js";
import cryptoJs from 'crypto-js';
import { GnumDailyBets } from '../models/gnm-dailybets-schema.js';

const gamesData=asyncHandler(async(req,res)=>{
    const {
        id,
        gameName,
        loss,
        profit,
        betted,
        investment,
    }=req.body;
    const game=await GamesData.create({
        id,
        gameName,
        loss,
        profit,
        betted,
        investment,
        });
    const existesGame=await GamesData.findOne({gameName});
    if(existesGame){
        throw new ApiError(401,"Game already exists")

    }
        
        if(!game){
        throw new ApiError(400,'game not created');
        }
        res.status(201)
        .json(new ApiRes(200,{game},"game created success"));


    });

    const generateGameTokens=async(gameId)=>{
      try {
          
        const game = await GamesData.findById(gameId);
         const gameToken = await game.generateGameToken();
        const refreshToken = await game.generaterefreshToken();
  
        console.log("Generated tokens:", { gameToken, refreshToken });
  
        game.refreshToken = refreshToken;
        await game.save({ validateBeforeSave: false });
        // const {num}=await guessNumGenerator()
        return {gameToken,refreshToken};
    } catch (error) {
   throw new ApiError(500,error)
    }
    }

    // const betted=asyncHandler(async(req,res)=>{
    //     const {bet}=req.body;
    //     const {id}=req.body;
    //     const gameId=Number(id);
    //     const betAmt=Number(bet)
    //     const game=await GamesData.findOne(gameId);//will also pass the game name in the req body
    //     // const user=await User.findById(user._id);
    //     if(!game ){
    //         throw new ApiError("user and game not found");
    //     }
    //     const gameToken=game.generateGameandrefreshToken(game._id);

    //     game.betted=betAmt;
    //     // await user.save({validateBeforeSave:false});
    //     await game.save({validateBeforeSave:false})

    // })

    const   takeProfit=asyncHandler(async(req,res)=>{
        //   const game=await GamesData.findByID(req.game._id)
        const {amt}=req.body;
        const profitAmt=Number(amt)    //this will be the deducted amt in the frontend
        const user=await User.findById(req.user._id);
  if(!user){
    throw new ApiError(404,"User not found");
  }
       
        const game=await GamesData.findById(req.game._id);
        if(!game){
            throw new ApiError(400,"game not found");
        }
        
        game.profit+=profitAmt;
        // let lost=user.lost;
        user.lost+=profitAmt;
        user.invested-=profitAmt;
        await user.save({
            validateBeforeSave:false,
          });
        await game.save({validateBeforeSave:false});
        res.status(200).json({
            profit:game.profit,
            invested:user.invested,
            loss:user.loss, 
            message:"profit added"
        }
        );
    })

    const takeLoss=asyncHandler(async(req,res)=>{
        const {amt}=req.body;
        const lostAmt=Number(amt)    //this will be the deducted amt in the frontend
        const game=await GamesData.findById(req.game._id);
        if(!game){
            throw new ApiError(400,"game not found");
        }
        game.loss+=lossAmt;
        await game.save({validateBeforeSave:false});
        res.status(200).json(new ApiRes(200,game.profit,
            "Loss added successfuly"
        ));
    })

    const clearGameToken=asyncHandler(async(req,res)=>{
        await GamesData.findByIdAndUpdate(
            req.game._id,
            {
                $unset:{
                    refreshToken:1
                }
            }
        )
        const options={
            httpOnly:true,
            secure:true
        }
        res.clearCookie("gameToken",options),
        res.status(200).json(new ApiRes(200,"game token cleared"))
    })

   const overallGameData=asyncHandler(async(req,res)=>{
const totalprofit=await Game.aggregate([
    {
      '$lookup': {
        'from': 'gamesdatas', 
        'localField': 'gameData', 
        'foreignField': 'gameid', 
        'as': 'gameData'
      }
    }, {
      '$unwind': '$gameData'
    }, {
      '$group': {
        '_id': 'null', 
        'totalprofit': {
          '$sum': '$gameData.profit'
        }
      }
    }
  ])
res.status(200)
.json({
    message:"Total profit fetched successfully",
    data:totalprofit
})
   })


const guessNumGenerator = async () => {
    let limit = 2;
    let repNum = [];
    let occurrences = 0;
    let num = 0;

    do {
        // Generate a random number between 2 and 2000
        num = Math.floor(Math.random() * 1999 + 2); // Math.random() * (max - min) + min
        // Check the number of occurrences of `num` in `repNum`
        occurrences = repNum.reduce((count, current) => (current === num ? count + 1 : count), 0);
    } while (occurrences >= limit); // Repeat if occurrences of the number exceed the limit

    // If the random number is within the acceptable occurrences, add it to the array
    repNum.push(num);

    // Send the generated number as a response
    return({num})
};

const guessNumDailybets=asyncHandler(async(req,res)=>{
    const {lotterynum,
        profit,
        loss,
        betted
    }=req.body
    const bet=await GnumDailyBets.create({lotterynum,
        profit,
        loss,
        betted})
        if(!bet){
            throw new ApiError(400,'game not created');
            }
    
            res.status(200)
            .json({
              message:"Daily bets added",
           
            },);
    

})


//will generate  the token and random number 
const gnumTokenandNum=asyncHandler(async(req,res)=>{
  const game=await GamesData.findById(req.game._id);
  if(!game){
    throw new ApiError(400,"Game not found")
  }
  console.log(game.id)
  const {gameToken,refreshToken}=await generateGameTokens(game._id)
  const{num}=await guessNumGenerator()
  if (!gameToken  && !num){
    throw new ApiError(500, "Failed to return tokens and generate number");
  }
 res.status(200)
 .json(
  {
    message:"token generation successfully",
    num:num
  },
 )


})








const guessNumDaily=asyncHandler(async(req,res)=>{
    const game=[
            {
              '$lookup': {
                'from': 'gamesdatas', 
                'localField': 'gameid', 
                'foreignField': 'gameid', 
                'as': 'game'
              }
            }, {
              '$unwind': '$game'
            }, {
              '$match': {
                'game.gameName': 'Guess Num'
              }
            }, {
              '$project': {
                'game._id': 0, 
                'game.createdAt': 0, 
                'game.updatedAt': 0, 
                'game.dailybets': 0, 
                'game.investment': 0, 
                'game.dailybets': 0, 
                'game.__v': 0
              }
            }
          ]
          const Dailybets=await GnumDailyBets.aggregate(game)
          res.status(200)
          .json({
            Dailybets,
            message:"Daily bets for Guess Num game"
          })
        })



export {
    gamesData,
    clearGameToken,
    takeProfit,
    takeLoss,
    overallGameData,
    guessNumGenerator,
    guessNumDailybets,
    gnumTokenandNum
}
