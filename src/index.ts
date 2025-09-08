import config from "./config/config";
import app from "./app"
import { connectDb } from "./config/Db";

app.listen(config.port,()=>{
    console.log("server up and running")
})
// db connection
connectDb()