
import express from "express";
import { addCourse, allStudentCourses,deletedCourse } from "../controllers/courseControllers/course.controller";
// import { addCourse, findCourses, findCoursebyDept_Level } from "../controllers/userCourse.controller";
import { authorizeAccess } from "../middlewares/adminMiddleware/authorizeAccess";
// import { authenticateToken } from "../middlewares/authMiddleware";


const courseRouter = express.Router();

// Test route
courseRouter.get("/", (req, res) => {
    res.send("Course router up and running");
});

//  Admin-only routes //

// Add a course (admin only)
courseRouter.post("/add-courses",authorizeAccess(["admin"]), addCourse);

// Get all courses (admin only)
courseRouter.get("/all-courses",(req,res)=>{
    res.send("all course route running")
},authorizeAccess(["admin"]), allStudentCourses);

// delete course
courseRouter.delete("/delete-course",(req,res)=>{
res.send("delete route up and runnig")
},authorizeAccess(["admin"]),deletedCourse)

// Protected route for normal users to get their courses
// courseRouter.get("/my-courses", authenticateToken, findCoursebyDept_Level);

export default courseRouter;