import mongo from "mongoose";
// import { DB_NAME } from "../constant.js";


// const port=process.env.PORT;
// const dbUrl=process.env.MONGO_URL;

async function connectDB(){
    try{
        const connectionInstance=  await mongo.connect(`${process.env.MONGO_URL}`);
        // console.log(DB_NAME);
        console.log(`Mongo DB connection Done  DB host =${connectionInstance.connection.host} `);
                
        }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;