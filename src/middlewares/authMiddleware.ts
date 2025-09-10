import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import userModel from "../models/userSchema.model";
import ResponseHandler from "../utils/responseHandlers";
import config from "../config/config"


// what i did here was to add user to my request cos it doesnt have it.
// it consist of params, url,body,headers,mehods,etc
interface AuthRequest extends Request{
    user? : any
}
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    
    // bearer token gotten and splited to get just the token from the bearer at index 1 using the empty string
    const token = authHeader && authHeader.split(' ')[1]; 
     if (!token) {
      return ResponseHandler.validationError(res, null, "Access token required");
    }

    // token verified using my secret key to be sure user is legit signed in
    const decoded = jwt.verify(token, config.secret_key) as any;
    const user  = await userModel.findById(decoded.id).select('-password');

    if (!user) {
      return ResponseHandler.validationError(res, null, "User not found");

    }
    req.user = user;
    next();
}catch(error){
return ResponseHandler.validationError(res,null,"invalid token")
}
}