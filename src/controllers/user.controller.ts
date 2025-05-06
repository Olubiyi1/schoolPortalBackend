import { createUser } from "../services/user.service";
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