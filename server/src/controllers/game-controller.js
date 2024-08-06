import {asyncHandler} from '../utils/asynchandler.js';
import { User } from '../models/users.js';
import { GamesData } from '../models/games-data-models.js';
import { Game } from '../models/games-models.js';
import { ApiError } from '../utils/api-error.js';
import {ApiRes} from '../utils/api-res.js';

const gamesData=asyncHandler(async(req,res)=>{
    const {gameName,
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

export {
    gamesData,
}