import express from "express";
import { registerUser } from "../controllers/user.controller";

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("up and running")
})

router.post("/signup",registerUser)

export default router;