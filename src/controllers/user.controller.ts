import {
  createUser,
  userLogin,
  getCurrentUserProfile,
  handleForgotPassword,
  handleResetPassword,
} from "../services/user.service";
import { Response, Request } from "express";
import ResponseHandler from "../utils/responseHandlers";
import fs from "fs";
import csv from "csv-parser";
import { hashPassword } from "../guards/guards";
import userModel from "../models/userSchema.model";



export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error, data } = await createUser(req.body);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }

    // return ResponseHandler.validationError(res,null,"an error occured")

    if (!data) {
      return ResponseHandler.validationError(res, null, "user data missing");
    }
    return ResponseHandler.success(res, data, "user created successfully");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // checking if email and password exists befire signing in
    if (!email || !password) {
      return ResponseHandler.validationError(
        res,
        null,
        "Email and pasword are required"
      );
    }

    const { error, data } = await userLogin(email, password);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    return ResponseHandler.success(res, data, "Login Successful");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

// get currentUser profile
export const getUserProfile = async (req: any, res: Response) => {
  try {
    const { error, data } = await getCurrentUserProfile(req.user.id);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }

    return ResponseHandler.success(
      res,
      data,
      "User profile retrieved successfully"
    );
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

// forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return ResponseHandler.validationError(
        res,
        null,
        "Please provide an email"
      );
    }

    const result = await handleForgotPassword(email);

    if (result.error) {
      return ResponseHandler.validationError(res, null, result.error);
    }

    return ResponseHandler.success(
      res,
      result.data,
      "Password reset link sent successfully"
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return ResponseHandler.validationError(res, null, error.message);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return ResponseHandler.validationError(
        res,
        null,
        "Please provide both token and new password"
      );
    }

    const result = await handleResetPassword(token, newPassword);

    if (result.error) {
      return ResponseHandler.validationError(res, null, result.error);
    }

    return ResponseHandler.success(
      res,
      result.data,
      "Password reset successfully"
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return ResponseHandler.validationError(res, null, error.message);
  }
};



// adding students using multer


interface MulterRequest extends Request {
  file: Express.Multer.File; // Multer's file type
}


export const uploadStudents = async (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).send("no file uplaod");
  }

//   stores all stduents before saving to bd

  const students: any[] = []
  const rowErrors:any []=[]

//   open csv file for reading
  fs.createReadStream(req.file.path)
  .pipe(csv()) //   sends content to csv-parser
.on("data",async(row)=>{

     const hashedPassword = await  hashPassword(row.password)
try{

    students.push({
        firstname: row.firstname,
      surname: row.surname,
      email: row.email,
      username: row.username,
      password: hashedPassword, 
      department: row.department,
      level: row.level,
      admissionNumber: row.admissionNumber,
      isVerified: true,
      role: "student"

    })
   

}
catch(err:any){

    // Instead of sending response, store row error.
    // this prevents multiple errors from running
      rowErrors.push({ row, message: err.message });

}

})
.on("end",async()=>{
    try{

         await userModel.insertMany(students); // save all students at once
    fs.unlinkSync(req.file.path);    // delete temp CSV file
    res.send(`Uploaded ${students.length} students successfully`);

    }
    catch(error:any){
        res.status(500).send("Error uploading students: " + error.message);
    }
})
}
