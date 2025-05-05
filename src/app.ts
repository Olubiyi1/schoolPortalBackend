import express from "express"
import { connectDb } from "./config/Db"
import router from "./routes/user.routes"

const app = express()
app.use(express.json())

// db connection
connectDb()

// routes
app.use("/api",router)


export default app;