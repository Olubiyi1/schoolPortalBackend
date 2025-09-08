import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import router from "./routes/user.routes"

const app = express()
app.use(helmet())
app.use(cors({
    // my frontend url
  origin: "http://localhost:5173", 
  // allowed methods
  methods: ["GET", "POST", "PUT", "DELETE"], 
  // for cookies/auth
  credentials: true 
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use("/api",router)


export default app;