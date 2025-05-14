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
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please provide an email" });
  }

  try {
    const result = await handleForgotPassword(email);

    if (result.error) {
        return ResponseHandler.validationError(res,null,result.error)
    //   return res.status(400).json({ error: result.error });
    }

    // return res.status(200).json({ message: result.data });
    return ResponseHandler.success(res,result)
  } catch (error:any) {
    console.error("Forgot password error:", error);
    // return res.status(500).json({ error: "Internal Server Error" });
    return ResponseHandler.validationError(res,null,error.message)
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Please provide both token and new password" });
  }

  try {
    const result = await handleResetPassword(token, newPassword);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: result.data });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


