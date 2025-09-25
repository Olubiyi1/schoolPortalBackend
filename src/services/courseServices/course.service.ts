import { error } from "console";
import userCourse from "../../models/courseSchema.model";

interface CourseFilter {
  department?: string;
  level?: string;
  semester?: string;
}

// create course
export const createCourse = async (courseData: any) => {
  try {
    // Check if course code already exists
    const existingCourse = await userCourse.findOne({ code: courseData.code });
    
    if (existingCourse) {
      return { error: "Course code already exists", data: null };
    }

    // Create new course
    const newCourse = new userCourse({
      title: courseData.title,
      code: courseData.code,
      department: courseData.department,
      level: courseData.level,
      semester: courseData.semester
    });

    // Save course to database
    const savedCourse = await newCourse.save();
    
    return { error: null, data: savedCourse };
    
  } catch (error: any) {
    console.error("Course creation error:", error);
    return { error: error.message, data: null };
  }
};



// get all courses

export const getAllCourses = async()=>{
  try{
    const courses = await userCourse.find()
    return {error:null, data: courses}
  }
  catch(error:any){
    return {error:error, data:null}
  }
}


// delete course

export const deleteCourse = async(id: string)=>{
  try{

    const deletedCourse = await userCourse.findByIdAndDelete(id)

    return {error:null,data:deletedCourse}

  }
  catch(error:any){

    return {error:error.message,data:null}

  }
}

