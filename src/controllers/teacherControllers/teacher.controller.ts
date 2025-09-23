import { teacherLogin } from "../../services/teacherService/teacherService.service";
import { Request, Response } from "express";
import ResponseHandler from "../../utils/responseHandlers";

export const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseHandler.validationError(
        res,
        null,
        "Email and Password are required"
      );
    }

    const { error, data } = await teacherLogin(email, password);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    return ResponseHandler.success(res, data, "Teacher login successful");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};
