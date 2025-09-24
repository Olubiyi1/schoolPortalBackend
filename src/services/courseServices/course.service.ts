import userCourse from "../../models/courseSchema.model";

interface CourseFilter {
  department?: string;
  level?: string;
  semester?: string;
}


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


export const getAllCourses = async (filter?: CourseFilter) => {
  try {
    // If no filter is provided, fetch all courses
    const courses = await userCourse.find(filter || {});
    return { error: null, data: courses };
  } catch (error: any) {
    console.error("Error fetching courses:", error.message);
    return { error: error.message, data: null };
  }
};

