import config from "./config";
import mongoose from "mongoose";


// connection to Db
export const connectDb = async () => {
  try {
    await mongoose.connect(config.mongo_Url);
    console.log("connection to db successful");

    // allows default admin to run immediately when server starts
//
    // await ensureDefaultAdmin();

  } catch (error) {
    console.log("failed to connect Db");
    console.log(error);
    
  }
};
