import { adminLogin } from "../../services/adminServices/admin.service";
import { Request,Response } from "express";
import ResponseHandler from "../../utils/responseHandlers";

export const loginAdmin= async(req:Request,res:Response)=>{
try{

    const {email,password}= req.body

    if(!email || !password){
        return ResponseHandler.validationError(res,null,"Email and password are required")
    }

    const {error,data} = await adminLogin(email,password)
    
    if(error){
    return ResponseHandler.validationError(res,null,error)
    }
    return ResponseHandler.success(res,data,"Admin login successful")
}
catch(error:any){
    return ResponseHandler.validationError(res,null,error.message)
}
}
