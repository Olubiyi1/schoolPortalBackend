import express from "express";
import { loginAdmin,addTeacher, addStudent,deletedTeacher,deletedStudent } from "../../controllers/adminControllers/admin.controller";
import { authorizeAccess } from "../../middlewares/adminMiddleware/authorizeAccess";




const adminRouter = express.Router();

// Test route
adminRouter.get("/", (req, res) => {
  res.send("Admin routes up and running");
});

// Admin login
adminRouter.post("/login", loginAdmin);

// add teacher
adminRouter.post("/create-teacher",authorizeAccess(["admin"]),addTeacher)

// add student
adminRouter.post("/create-student",authorizeAccess(["admin"]),addStudent)

// delete teacher
adminRouter.delete("/delete-teacher",(req,res)=>{
  res.send("delete teacher route up and running")
},authorizeAccess(["admin"]),deletedTeacher)

//deletecStudent
adminRouter.delete("/delete-student",(req,res)=>{
  res.send("delete student route up and running")

},authorizeAccess(["admin"]),deletedStudent)


export default adminRouter;

