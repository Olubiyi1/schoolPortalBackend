
import express from "express";
import { addCourse, findCourses, findCoursebyDept_Level } from "../controllers/userCourse.controller";
import { adminAuthenticateToken } from "../middlewares/adminMiddleware/adminAuth.middleware";
import { authenticateToken } from "../middlewares/authMiddleware";

const courseRouter = express.Router();

// Test route
courseRouter.get("/", (req, res) => {
    res.send("Course router up and running");
});

//  Admin-only routes //

// Add a course (admin only)
courseRouter.post("/add",adminAuthenticateToken, addCourse);

// Get all courses (admin only)
courseRouter.get("/all",adminAuthenticateToken, findCourses);

// Protected route for normal users to get their courses
courseRouter.get("/my-courses", authenticateToken, findCoursebyDept_Level);

export default courseRouter;