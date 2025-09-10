import express from "express";
import { registerUserValidationSchema, loginValidationSchema } from "../validationSchema/user.validation";
import { authenticateToken } from "../middlewares/authMiddleware";
import { getUserProfile } from "../controllers/user.controller";
import { registerUser,loginUser, resetPassword, forgotPassword } from "../controllers/user.controller";
import { validateRequest } from "../middlewares/userValidationMiddleware";
import { verifyEmail } from "../controllers/emailVerification.controller";


const router = express.Router()

router.get("/",(req,res)=>{
    res.send("up and running")
})

router.post("/signup",validateRequest(registerUserValidationSchema),registerUser)
router.get("/verify-email",verifyEmail)
router.post("/login",validateRequest(loginValidationSchema),loginUser)
router.get("/profile", authenticateToken, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password",resetPassword);

export default router;

