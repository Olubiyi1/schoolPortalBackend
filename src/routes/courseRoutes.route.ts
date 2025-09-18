import express from "express"
import { addCourse,findCourses,findCoursebyDept_Level } from "../controllers/userCourse.controller";
import { authenticateToken } from "../middlewares/authMiddleware";


const courseRouter = express.Router()

courseRouter.get("/",(req,res)=>{
    res.send("up and running")
})


// courses routes

// i will be creating a single admin RBAC to add courses

courseRouter.post("/add-course", addCourse);  
courseRouter.get("/all-courses", findCourses);
courseRouter.get("/my-courses/",authenticateToken,findCoursebyDept_Level)

export default courseRouter