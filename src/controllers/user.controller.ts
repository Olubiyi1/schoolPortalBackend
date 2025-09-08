import { createUser,userLogin, handleForgotPassword, handleResetPassword } from "../services/user.service";
import { Response, Request } from "express";
import ResponseHandler from "../utils/responseHandlers";


export const registerUser = async (req:Request, res:Response)=>{
    try{
        const {error,data} = await createUser(req.body)
        

        if(error){
            return ResponseHandler.validationError(res,null,error)
        }

        // return ResponseHandler.validationError(res,null,"an error occured")

        if(!data){
            return ResponseHandler.validationError(res,null,"user data missing")
        }
        return ResponseHandler.success(res,data,"user created successfully")
       
    } catch(error:any){
        return ResponseHandler.validationError(res,null,error.message)
    }
}

export const loginUser = async (req:Request,res:Response)=>{
    try{
        const {email,password}= req.body

        // checking if email and password exists befire signing in
        if(!email || !password){
            return ResponseHandler.validationError(res,null,"Email and pasword are required")
        }
      
        const {error,data} = await userLogin(email,password)

        if(error){
            return ResponseHandler.validationError(res,null,error)
        }
        return ResponseHandler.success(res,data,"Login Successful")
    }
    catch(error:any){
        return ResponseHandler.validationError(res,null,error.message)
    }
}

// forgot password
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return ResponseHandler.validationError(res, null, "Please provide an email");
        }

        const result = await handleForgotPassword(email);

        if (result.error) {
            return ResponseHandler.validationError(res, null, result.error);
        }

        return ResponseHandler.success(res, result.data, "Password reset link sent successfully");
    } catch (error: any) {
        console.error("Forgot password error:", error);
        return ResponseHandler.validationError(res, null, error.message);
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return ResponseHandler.validationError(res, null, "Please provide both token and new password");
        }

        const result = await handleResetPassword(token, newPassword);

        if (result.error) {
            return ResponseHandler.validationError(res, null, result.error);
        }

        return ResponseHandler.success(res, result.data, "Password reset successfully");
    } catch (error: any) {
        console.error("Reset password error:", error);
        return ResponseHandler.validationError(res, null, error.message);
    }
};
