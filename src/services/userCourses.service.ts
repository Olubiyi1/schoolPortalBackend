import { error } from "console";
import userCourse, { ICourse } from "../models/courseSchema.model";

export const createCourse = async (data: ICourse) => {

    try{
  const course = new userCourse(data);
  const savedCourse = await course.save();

  return{error: null, data:savedCourse}
    }
    catch(error : any){
return {error:error.message,data:null}
    }
};

export const getCourseByDeptAndLevel = async (department: string, level: string)=>{

    try{
        const courses = await userCourse.find({
            department: department,
            level: level
        })

        return {error:null, data:courses}

    }
    catch(error:any){
        return {error: error.message,data: null}
    }
}



export const getAllCourses = async()=>{

    try{

        const allCourses = await userCourse.find()
        return {error:null, data:allCourses}
    }

    catch(error:any){
        return {error:error.message, data:null}
    }

}

    
  