// starting up my dotenv
import dotenv from "dotenv"
dotenv.config()

// using default export to export all env files
export default{
    port:parseInt(process.env.PORT as string,10),
    mongo_Url : process.env.MONGO_URL as string
}
