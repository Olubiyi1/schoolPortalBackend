import { createUser,userLogin } from "../services/user.service";
import { Response, Request } from "express";
import ResponseHandler from "../utils/responseHandlers";
import { handleForgotPassword, handleResetPassword } from "../services/passwordReset.service";

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



