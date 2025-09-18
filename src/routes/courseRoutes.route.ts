import express from "express"
import { addCourse,findCourses,findCoursebyDept_Level } from "../controllers/userCourse.controller";
import { adminAuthenticateToken } from "../middlewares/adminMiddleware/adminAuth.middleware";
import { authenticateToken } from "../middlewares/authMiddleware";


const courseRouter = express.Router()

courseRouter.get("/",(req,res)=>{
    res.send("course router up and running")
})


// courses routes

// i will be creating a single admin RBAC to add courses

courseRouter.post("/add-course",adminAuthenticateToken, addCourse);  
courseRouter.get("/all-courses",adminAuthenticateToken,findCourses);
courseRouter.get("/my-courses/",authenticateToken,findCoursebyDept_Level)

export default courseRouter