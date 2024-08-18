import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/users.js";
import { model } from "mongoose";
import { use } from "bcrypt/promises.js";
//importing user model
import { ApiRes } from "../utils/api-res.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GamesData } from "../models/games-data-models.js";
import { json } from "express";



const userRegister = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    age,
    country,
    username,
    password,
    confirmPassword,
  } = req.body;

  //Example validation (uncomment and modify as needed)
  if (
  !name && name=="" || !email && email=="" ||!age && age=="" ||!country && country==""||
  !username && username==""||!password && password=="" || !confirmPassword && confirmPassword=="")
   {
      throw new ApiError(400, "All fields are required");
  }

  console.log("Email:", email);
  console.log("Name:", name);
console.log("Password",password)


//   // Handle the existing registration logic here
  const existedUser=await User.findOne({
   $or:[{username},{email}]// taking an operator obj to check username and email
  })
if(existedUser){
   throw new ApiError(408,"User already exists");
}
// const hashedPassword = await bcrypt.hash(password, 10);
const user=await User.create({
   name,
    email,
    age,
    country,
    username:username.toLowerCase(),
    password,
    
})

// Remove confirmPassword before creating the user object:
// const userToCreate = {
//   name,
//   email,
//   age,
//   country,
//   username: username.toLowerCase(),
//   password
// };

// const user = await User.create(userToCreate);
// const createUser = await User.findById(user._id).select("-password -refreshToken");

// if(!createUser)
// {throw new ApiError("400","User not created");}

return res.status(200).json({user});
})


const loginUser=asyncHandler(async (req,res)=>{
  
  //taking username and password from user for login
  const {username,password}=req.body

  if(!username ){
    throw new ApiError(404,"Username is required")
  }

  const user=await User.findOne({username});
  // console.log(user)
  if(!user){
    throw new ApiError(404,"User not found")
  }
  const check=await user.checkPassword(password)
if(!check){
  throw new ApiError(404,"Password is incorrect")
}
  const checkPassword=await user.checkPassword(password)

  //validating password
  if(checkPassword===false){
    throw new ApiError(401,"Password is incorrect")
  }

    const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id)
    //generating ref and acc token for logged user & storing into acc and ref token var 

    const loggedUser=await User.findById(user._id).select("-password -refreshtoken")
    //selecting only username and email from user collection

    const options={
      httpOnly:true,
      secure:true
    }//options for cookies so that it can by only be modified 
   
   
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    // res.send(json(
    //   new ApiRes(
    //     200,//status
    //     {user:loggedUser,refreshToken,accessToken},//data
    //     "user logged in Successfully"
    //   ))
    // );
     res.json({ user, refreshToken, accessToken });
    //set cookies for access and refresh token
});
  
  
  const generateAccessandRefreshToken=async(userId)=>{
    try{
    const user=await User.findOne(userId)
      const accessToken=await user.generateAccessToken()
      const refreshToken=await user.generateRefreshToken()

      user.refreshToken=refreshToken;
      await user.save({
        validateBeforeSave:false
        //this property will not validate username and password 
        //save the refresh token in our db
      })
        return {refreshToken,accessToken}
    }
    catch(error){
      throw new ApiError(500,"Internal server error")
    }

  }


const logOut=asyncHandler(async (req,res)=>{
//now we got user id by using access token and login method
//so we find that user and delete his refresh token 
//after that delete the cookies

    await User.findByIdAndUpdate(
      req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
    return res
        .status(200)
        .json(
            new ApiRes(200, {}, "User logged out")
        )
})

//generating a new access token for user

const generatenewAccessToken=asyncHandler(async(req,res,next)=>{

  try {
    const incomingrefreshToken = req.headers.cookie.split('; ')[1].split('=')[1];
  
    if(!incomingrefreshToken){
      throw new ApiError("Incoming refresh token not found");
    }
    
    const decode=jwt.verify(incomingrefreshToken,process.env.REFRESH_TOKEN_SECRET);
    const user=await User.findById(decode._id);
  
  if(!user){
    throw new ApiError("User not found");
  }
  
    if(incomingrefreshToken!==user.refreshToken){
      throw new ApiError("Refresh token not matched");
    }
    const options = {
      httpOnly: true,
      secure: true
  }
  
    //generating new access and refresh token 
  const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id);
  //updating the user with new refresh token
  // user.refreshToken=newRefreshToken;
  // await user.save();
  res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiRes(200,{accessToken,refreshToken},
      "New access token generated")
    )
  
  
    
  
  
  } catch (error) {
    throw new ApiError(401,error)
  }

})
const ChangeCurrentPassword=asyncHandler(async(req,res)=>{

  const {newPassword}=req.body//taking old and new password form user
  const user=await User.findById(req.user._id)//finding te user by id
  const isPasswordCorrect=user.checkPassword(oldPassword)//checking old password
  if(!isPasswordCorrect){
    throw new ApiError(401,"old password is incorrect")
  }
  user.password=newPassword
  await user.save({
    validateBeforeSave:false
  })
  return res.status(200)
  .json(
  new ApiRes(200,{},'New password set successfully')
  )

})


const getCurrentUser=asyncHandler(async(req,res)=>{
//  const actoken=req.headers.Authorization.replace("Bearer ","")
  const user=await User.findById(req.user._id).select("-password -refreshToken")
  // console.log(user)
  return res.status(200)
  .json(new ApiRes(200,user,"cuurent user fetched successfully"))
})

// const passToken=

const checkMail=asyncHandler(async(req,res)=>{
 try {
   const {email}=req.body;
   const user=await User.findOne({email})
   if(!user){
     throw new ApiError(401,"user not found")
   }
   const options={
     http:true,
     secure:true
   }
   const token=await user.generatePassAccesstoken(user._id);
 
   res.cookie('accessToken', token, options);
   res.status(200).json({ message: "Token generated, you can now change your password", token });
  
 } catch (error) {
  console.log(error);
 }
})

// Invest Money
const investMoney = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { amount } = req.body;
  const numericAmount = Number(amount);

  if (numericAmount <= 0) {
    throw new ApiError(400, "Amount must be a positive number");
  }

  user.invested= (user.invested || 0) + numericAmount;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiRes(200, user.invested , "Balance added successfully"));
});

const adminData=asyncHandler(async(req,res)=>{

  const user=await User.find()
  if(!user){
    throw new ApiError(404,"User not found");

  }
  res.status(200)
  .json(new ApiRes(200,{user},"All users data fetched successfully"))


})


const withdrawAmt=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id)
  if(!user){
    throw new ApiError(404,"User not found");
  }
  const {amt}=req.body;
  var numericAmt=Number(amt)
  if(numericAmt<=0){
    throw new ApiError(401,"Amount should be greater than 0")

  }
  const deductedAmt=numericAmt*20/100
  var finalAmt=numericAmt-deductedAmt
  user.invested=user.invested-finalAmt;
  await user.save()
  res.status(200).
  json(new ApiRes(200,{},"AMount withdrawn successfully"))

})

const deductLostAmt=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id);
  if(!user){
    throw new ApiError(404,"User not found");
  }
  const {amt}=req.body;
  let numericAmt=Number(amt)
  if(numericAmt<=0){
    throw new ApiError(401,"Amount should be greater than 0")

  }
  let lost=user.lost;
  lost=lost-numericAmt;
  user.invested=user.invested-numericAmt;
  await user.save({
    validateBeforeSave:false,
  });
  res.status(200)
  .json(new ApiRes(200,{lost},"The amt is deducted"))
})

//betunits will take the bet amt of user and basically generate a game token (asynch function)
  const betUnits=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
  if(!user){
    throw new ApiError(404,"User not found");
  }
  const {amt,id}=req.body;
  var finalAmt=Number(amt);
  // const gameId=Number(id);
  // const finalId={
    //   id:gameId,
    // }
    if(finalAmt<=0){
      throw new ApiError(401,"Amount should be greater than 0")
    }
    const game = await GamesData.findOne({id})
    if (!game) {
      throw new ApiError(404, "Game not found");
    }
    
    // const tokens =  generateGameandrefreshToken(game._id);
    
    // const tokens =await generateGameandrefreshToken(game._id);
    const {gameToken,refreshToken}=await generateGameandrefreshToken(game._id)
    if (!gameToken ){
      throw new ApiError(500, "Failed to return tokens");
    }
    const options={
      httpOnly:true,
      secure:true
    }
    game.betted+=finalAmt;
    game.dailybets.push(
      {
        user:user._id, //founded the user now alloacting the daily bets
        amount:finalAmt,
        date:new Date(),
      }
    )
    user.invested=user.invested-finalAmt;
    user.betted+=finalAmt;
    await user.save({
      validateBeforeSave:false,
    });
    await game.save({
      validateBeforeSave:false,
    });
    res.cookie("gameToken", gameToken, options);
    res.status(200)
    .json({
      invested:user.invested,
      gameToken:gameToken,
      message:"gametoken generated successfully "
    })
      
    })

//async fucntion which will generate a token for game
//No asynchandler used because it is not returning a promise
    const generateGameandrefreshToken = async function(gameId) {
      try {
          const game = await GamesData.findById(gameId);
           const gameToken = await game.generateGameToken();
          const refreshToken = await game.generaterefreshToken();
    
          console.log("Generated tokens:", { gameToken, refreshToken });
    
          game.refreshToken = refreshToken;
          await game.save({ validateBeforeSave: false });
    
          return {gameToken,refreshToken};
      } catch (error) {
     throw new ApiError(500,"Internal server error")
      }
    };
    
    
    const AddWinningUnits=asyncHandler(async(req,res)=>{
      const user=await User.findById(req.user._id);
      if(!user){
        throw new ApiError(404,"User not found");
      }
      const {amt}=req.body;
      var numericAmt=Number(amt)
  if(numericAmt<0){
    throw new ApiError(401,"Amount should be greater than 0")
  }
  user.invested=user.invested+numericAmt;
  var baal=user.invested
  await user.save({validateBeforeSave:false})
  res.status(200)
  .json(new ApiRes(200,{baal},"AMT DEPOSITED TO THE ACCOUNT"))
})




export { userRegister,
  loginUser,
  logOut,
  generatenewAccessToken,
  investMoney,
  ChangeCurrentPassword,
  getCurrentUser,
  checkMail,
  adminData,
  withdrawAmt,
  deductLostAmt,
  betUnits,
  AddWinningUnits,
  generateGameandrefreshToken,

}