import express from "express";
import mongo from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


const app =express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your React app URL
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));

// app.use(cors(
//     {
//         origin:process.env.CORS_ORIGIN,
//         credentials: true,
//     }
// ));

dotenv.config({
    path:"./.env"
});

//connecting db
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error);
        throw error;
    });//event listener for error by using express app
    app.listen(process.env.PORT,()=>{
        console.log(`Server running at ${process.env.PORT}`);
    })
}
).catch((error)=>{
console.log(`connection failed because of${error}`);
})


//importing and using routes 
import routers from "../src/routes/user_routes.js"

app.use("/api/users",routers);//this is the prefix










// const port=process.env.PORT || 7000;
// const mongourl=process.env.MONGO_URL;

// mongo.connect(mongourl).then(()=>{
//     console.log("connected to db")
//     app.listen(port,()=>{
//         console.log(`server is running on ${port}`)
//     });
// }).catch((error)=>{console.log(error)})