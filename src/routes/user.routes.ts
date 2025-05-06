import express from "express";
import { registerUserValidationSchema } from "../validationSchema/user.validation";
import { registerUser } from "../controllers/user.controller";
import { validateRequest } from "../middlewares/userValidationMiddleware";
import { verifyEmail } from "../controllers/emailVerification.controller";
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("up and running")
})

router.post("/signup",validateRequest(registerUserValidationSchema),registerUser)
router.get("/verify",verifyEmail)

export default router;