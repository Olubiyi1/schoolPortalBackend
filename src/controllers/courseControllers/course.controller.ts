import { createCourse, getAllCourses } from "../../services/courseServices/course.service";
import { Request, Response } from "express";
import ResponseHandler from "../../utils/responseHandlers";



interface CourseInput {
  title: string;
  code: string;
  department: string;
  level: string;
  semester: string;
}

// normally this is what request body looks like (Request<Params, ResponseBody, RequestBody>)but i only need RequestBody
// Define AuthRequest with body type

interface AuthRequest extends Request<{}, {}, CourseInput> {
  user?: any;
}



export const addCourse = async (req: AuthRequest, res: Response) => {
  try {
    // Check if user is admin

    if (!req.user || req.user.role !== 'admin') {
  return ResponseHandler.validationError(res, null, "Access denied. Admin only.");
}

console.log("Incoming course data:", req.body);


    // if (req.user.userType !== 'admin') {
    //   return ResponseHandler.validationError(res, null, "Access denied. Admin only.");
    // }

    // Validate required fields
    const { title, code, department, level, semester } = req.body;
    
    if (!title || !code || !department || !level || !semester) {
      return ResponseHandler.validationError(res, null, "All course fields are required");
    }

    // Call service to create course
    const { error, data } = await createCourse(req.body);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }

    return ResponseHandler.success(res, data, "Course created successfully");
    
  } catch (error: any) {
    console.error("Add course controller error:", error);
    return ResponseHandler.validationError(res, null, error.message);
  }
};

export const fetchCoursesForStudent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return ResponseHandler.validationError(res, null, "Access denied");
    }

    // Optionally, you could filter by student level or department
    const filter = {
      department: req.user.department,
      level: req.user.level,
    };

    const { error, data } = await getAllCourses(filter);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }

    return ResponseHandler.success(res, data, "Courses fetched successfully");
  } catch (error: any) {
    console.error("Fetch courses error:", error);
    return ResponseHandler.validationError(res, null, error.message);
  }
};