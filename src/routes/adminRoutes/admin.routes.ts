import express from "express"
import { loginAdmin } from "../../controllers/adminControllers/admin.controller";
import { adminAuthenticateToken } from "../../middlewares/adminMiddleware/adminAuth.middleware";


const adminRouter= express.Router()


// admin routes
adminRouter.post("/admin/login",adminAuthenticateToken, loginAdmin);

export default adminRouter;