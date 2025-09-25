import {
  adminLogin,
  createTeacher,
  createStudents,
  deleteTeacher,
  deleteStudent,
} from "../../services/adminServices/admin.service";
import { Request, Response } from "express";
import ResponseHandler from "../../utils/responseHandlers";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseHandler.validationError(
        res,
        null,
        "Email and password are required"
      );
    }

    const { error, data } = await adminLogin(email, password);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    return ResponseHandler.success(res, data, "Admin login successful");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

// add teacher
export const addTeacher = async (req: Request, res: Response) => {
  try {
    const { firstname, surname, email, password } = req.body;

    if (!firstname || !surname || !email || !password) {
      return ResponseHandler.validationError(
        res,
        null,
        "All fields are required"
      );
    }

    const { error, data } = await createTeacher(req.body);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }

    return ResponseHandler.success(res, data, "Teacher created successfully");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

// add studnet
export const addStudent = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      surname,
      email,
      username,
      password,
      department,
      level,
      admissionNumber,
      gender,
      semester,
    } = req.body;

    if (
      !firstname ||
      !surname ||
      !email ||
      !username ||
      !password ||
      !department ||
      !level ||
      !admissionNumber ||
      !gender ||
      !semester
    ) {
      return ResponseHandler.validationError(
        res,
        null,
        "All fields are required"
      );
    }
    const { error, data } = await createStudents(req.body);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    return ResponseHandler.success(res, data, "Teacher created successfully");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

// delete teacher

export const deletedTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error, data } = await deleteTeacher(id);
    if (error) {
      return ResponseHandler.validationError(
        res,
        null,
        "error deleting teacher"
      );
    }
    if (!data) {
      return ResponseHandler.validationError(res, null, "teacher not found");
    }
    return ResponseHandler.success(res, data, "Teacher deleted successfuly");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

// delete student

export const deletedStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error, data } = await deleteStudent(id);
    if (error) {
      return ResponseHandler.validationError(
        res,
        null,
        "error delting student"
      );
    }
    if (!data) {
      return ResponseHandler.validationError(res, null, "student not found");
    }
    return ResponseHandler.success(res, data, "Student deleted successfully");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};
