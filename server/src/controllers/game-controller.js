import {asyncHandler} from '../utils/asynchandler.js';
import { User } from '../models/users.js';
import { GamesData } from '../models/games-data-models.js';
import { Game } from '../models/games-models.js';
import { ApiError } from '../utils/api-error.js';
import {ApiRes} from '../utils/api-res.js';

const gamesData=asyncHandler(async(req,res)=>{
    const {gameName,
        id,
        loss,
        profit,
        betted,
        
    }=req.body;
    const game=await GamesData.create({gameName,
        loss,
        profit,
        betted,
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

    const generateGameandrefreshToken=asyncHandler(async(gameId)=>{
        const game=await GamesData.findOne({gameId});
        const gameToken=await game.generateGameToken();
        const refreshToken=await game.generateRefreshToken();
        game.refreshToken=refreshToken;
        await game.save({validateBeforeSave:false});
        const options={
            http:true,
            secure:true
        }
        res.cookie(gameToken,"gameToken",options);
        res.json(new ApiRes(200,{gameToken},"game token created"));
    })

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

    const takeProfit=asyncHandler(async(req,res)=>{
        const {amt}=req.body;
        const profitAmt=Number(amt)    //this will be the deducted amt in the frontend
       
        const game=await GamesData.findById(req.game._id);
        if(!game){
            throw new ApiError(400,"game not found");
        }
        game.profit+=profitAmt;
        await game.save({validateBeforeSave:false});
        res.status(200).json(new ApiRes(200,game.profit,
            "Profit added successfuly"
        ));
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

    

export {
    gamesData,
    betted,
    takeProfit,
    takeLoss,

}