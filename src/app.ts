import express from "express"
import { connectDb } from "./config/Db"

const app = express()
app.use(express.json())

// db connection
connectDb()

export default app;