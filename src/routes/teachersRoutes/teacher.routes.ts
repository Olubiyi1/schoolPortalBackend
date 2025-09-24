import express from "express"
import { loginTeacher } from "../../controllers/teacherControllers/teacher.controller"
import { authorizeAccess } from "../../middlewares/adminMiddleware/authorizeAccess"


const teacherRouter = express.Router()

// test route
teacherRouter.get('/',(req,res)=>{
    res.send("teacher's route up and running")
})

// teacher's login
teacherRouter.post("/login",loginTeacher)

export default teacherRouter