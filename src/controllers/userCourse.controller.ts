import {createCourse, getCourseByDeptAndLevel, getAllCourses,} from "../services/userCourses.service";
import { Response, Request } from "express";
import ResponseHandler from "../utils/responseHandlers";

interface AuthRequest extends Request {
  user?: any;
}

export const addCourse = async (req: Request, res: Response) => {
  try {
    const { error, data } = await createCourse(req.body);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    if (!data) {
      return ResponseHandler.validationError(res, null, "course data missing");
    }
    return ResponseHandler.success(res, data, "course created successfully");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

export const findCoursebyDept_Level = async (req: AuthRequest, res: Response) => {
  try {
    const { department, level } = req.user;

    const { error, data } = await getCourseByDeptAndLevel(department, level);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    return ResponseHandler.success(
      res,
      data,
      "course data retrieved successfully"
    );
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

export const findCourses = async(req: Request, res:Response)=>{

    try{

        const {error,data} =await getAllCourses()

        if (error){
            return ResponseHandler.validationError(res,null,error)
        }
        return ResponseHandler.success(res,data,"All courses found")
    }
    catch(error:any){
return ResponseHandler.validationError(res,null,error.message)
    }
}


