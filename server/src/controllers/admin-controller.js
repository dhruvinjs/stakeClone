
import {asyncHandler} from '../utils/asynchandler.js';
import {ApiError} from "../utils/api-error.js";
import {Admin} from '../models/admin-model.js';
import { ApiRes } from '../utils/api-res.js';

const regAdmin=asyncHandler(async(req,res)=>{
const{
    name,
    email,
    age,
    country,
    username,
    password,
 } = req.body;
  if (
    !name && name=="" || !email && email=="" ||!age && age=="" ||!country && country==""||
    !username && username==""||!password && password=="")
     {
        throw new ApiError(400, "All fields are required");
    }

    const admin=await Admin.create({
        name,
        email,
        age,
        country,
        username:username.toLowerCase(),
        password,
    })
    if(!admin){
        throw new ApiError(400, "Failed to create admin");
    }
    else{
        res.status(201)
        .json({admin});
    }
}
)

const loginAdmin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        throw new ApiError(400, "All fields are required");
    }
    const admin=await Admin.findOne({email})
    if(!admin){
        throw new ApiError(400, "Invalid username or password");
    }
    const check=await admin.comparePassword(password)
    if(!check){
        throw new ApiError(401,"password is incorrect");
    }
    
const {refreshToken}=await generateRefreshToken(admin._id);
   const options={
    httpOnly: true,
    secure:true
   }
   res.cookie("refreshToken", refreshToken, options);
   res.status(200)
     .json({
        admin,
        token:refreshToken,
       message: "Admin login success"
     });
    })

const generateRefreshToken=async(adminId)=>{
    
 try {
    const admin=await Admin.findById(adminId);
       const refreshToken=await admin.generateRefToken();
       admin.refreshToken=refreshToken;
   
       await admin.save({
           validateBeforeSave:false,
       })
       return {refreshToken};
 } catch (error) {
    console.log(error)
 }
}

const adminProfile=asyncHandler(async(req,res)=>{
    const admin=await Admin.findById(req.admin._id);
    if(!admin){
        throw new ApiError("Admin data not found");
    }
    res.status(200)
    .json(admin);
})

const logOutAdmin=asyncHandler(async(req,res)=>{
    const admin=await Admin.findByIdAndUpdate(req.admin._id,
        {
            $unset:{
                refreshToken:1,
            },
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie('refreshToken',options)
    .status(200)
    .json(new ApiRes(200,{},'Admin logged Out'))

})

export {
    regAdmin,
    loginAdmin,
    adminProfile,
    logOutAdmin,

};