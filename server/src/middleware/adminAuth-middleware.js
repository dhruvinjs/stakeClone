import jsonwebtoken from "jsonwebtoken";
import { asyncHandler } from "../utils/asynchandler.js";
// import { User } from "../models/user";
import { Admin } from "../models/admin-model.js";  
import { ApiError } from "../utils/api-error.js";

const verifyAdminJwt=asyncHandler(async(req,res,next)=>{
 try {
       const authHeader=req.headers.authorization;
   
       if(!authHeader || !authHeader.startsWith("Bearer "))
       {
           throw new ApiError("token not send with Auth header")
       }
       const token=authHeader.replace('Bearer ',"");
       const decodedToken=jsonwebtoken.verify(token,process.env.REFRESH_TOKEN_SECRET);
       const admin=await Admin.findById(decodedToken._id).select("-refreshToken,-password");
       if(!admin){
           throw new ApiError("Invalid access token");
   
       }
       req.admin=admin;//here am giving access of admin data and storing in req.admin 
       //so that in next function i can ind the admin by using req.admin._id
       next();
   
 } catch (error) {
    throw new ApiError(401,error)
 }

})

export { verifyAdminJwt};
