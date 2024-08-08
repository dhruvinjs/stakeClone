import jsonwebtoken from "jsonwebtoken";
import {asyncHandler} from '../utils/asynchandler.js';
import { GamesData } from "../models/games-data-models.js";
import { ApiError } from "../utils/api-error";

const verifyGameJwt=asyncHandler(async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    const token=authHeader.replace("Bearer ","");
    if(!token){
        throw new ApiError(400,"token not recieved");
    }
    const decodedToken=jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const game=await GamesData.findById(decodedToken._id).select("-betting -profit -loss -investment")
    if(!game){
        throw new ApiError(400,"game not found")
    }
    req.game=game
next();
})
export {verifyGameJwt};
