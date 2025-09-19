import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import adminModel from "../../models/adminSchema.model";
import ResponseHandler from "../../utils/responseHandlers";
import config from "../../config/config";

//  what i did here was to add user to my request cos it doesnt have it.
// it consist of params, url,body,headers,mehods,etc
interface AuthRequest extends Request {
  user?: any;
}

export const adminAuthenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log("no token provided");
        
      return ResponseHandler.validationError(
        res,
        null,
        "Access token required"
      );
    }
    
    // token verifeid using my secret key to be sure user is legit
    const decoded = jwt.verify(token, config.secret_key) as any;

    // debugging to find id
    console.log("Decoded JWT payload:", decoded);
    console.log("Looking for user with ID:", decoded._id);

    const admin = await adminModel.findById(decoded.id).select("-password");

    // debugin to confirm user
    console.log("found admin", admin ? "Yes" : "No");

    if (!admin) {
      return ResponseHandler.validationError(res, null, "User not found");
    }

    req.user = admin;
    next();
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, "invalide token");
  }
};
