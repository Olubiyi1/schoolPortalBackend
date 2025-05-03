import config from "./config"
import mongoose from "mongoose";

// connection to Db
export const connectDb = async ()=>{
    try{
        await mongoose.connect(config.mongo_Url)
        console.log("connection to db successful")
    }
    catch(error){
        console.log("failed to connect Db");
    }
}