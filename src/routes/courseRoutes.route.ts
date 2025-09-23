
import express from "express";
import { addCourse, fetchCoursesForStudent } from "../controllers/courseControllers/course.controller";
// import { addCourse, findCourses, findCoursebyDept_Level } from "../controllers/userCourse.controller";
import { authorizeAccess } from "../middlewares/adminMiddleware/authorizeAccess";
// import { authenticateToken } from "../middlewares/authMiddleware";
// import { getAllCourses } from "../services/courseServices/course.service";

const courseRouter = express.Router();

// Test route
courseRouter.get("/", (req, res) => {
    res.send("Course router up and running");
});

//  Admin-only routes //

// Add a course (admin only)
courseRouter.post("/add-courses",authorizeAccess(["admin"]), addCourse);

// Get all courses (admin only)
courseRouter.get("/all",authorizeAccess(["admin"]), fetchCoursesForStudent);

// Protected route for normal users to get their courses
// courseRouter.get("/my-courses", authenticateToken, findCoursebyDept_Level);

export default courseRouter;