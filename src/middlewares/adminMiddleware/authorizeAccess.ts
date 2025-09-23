import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import adminModel from "../../models/adminSchema.model";
import ResponseHandler from "../../utils/responseHandlers";
import config from "../../config/config";
import teacherModel from "../../models/teacherSchema.model";


//  what i did here was to add user to my request cos it doesnt have it.
// it consist of params, url,body,headers,mehods,etc
interface AuthRequest extends Request {
  user?: any;
}

export const authorizeAccess = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return ResponseHandler.validationError(
          res,
          null,
          "Access token required"
        );
      }

      // decode token
      const decoded = jwt.verify(token, config.secret_key) as {
        id: string;
        role: string;
      };

      // check role
      if (!allowedRoles.includes(decoded.role)) {
        return ResponseHandler.validationError(res, null, "Unauthorized role");
      }

      // load user based on role
      if (decoded.role === "teacher") {
        const teacher = await teacherModel
          .findById(decoded.id)
          .select("-password");
        if (!teacher) {
          return ResponseHandler.validationError(
            res,
            null,
            "Teacher not found"
          );
        }
        req.user = teacher;
      }
      if (decoded.role === "admin") {
        const admin = await adminModel.findById(decoded.id).select("-password");
        if (!admin) {
          return ResponseHandler.validationError(res, null, "Admin not found");
        }
        req.user = admin;
      }

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return ResponseHandler.validationError(res, null, "Token expired");
      }
      return ResponseHandler.validationError(res, null, "Invalid token");
    }
  };
};



// export const adminAuthenticateToken = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;

//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//       console.log("no token provided");

//       return ResponseHandler.validationError(
//         res,
//         null,
//         "Access token required"
//       );
//     }

//     // token verifeid using my secret key to be sure user is legit
//     const decoded = jwt.verify(token, config.secret_key) as any;

//     // debugging to find id
//     console.log("Decoded JWT payload:", decoded);
//     console.log("Looking for user with ID:", decoded.id);

//     const admin = await adminModel.findById(decoded.id).select("-password");

//     // debugin to confirm user
//     console.log("found admin", admin ? "Yes" : "No");

//     if (!admin) {
//       return ResponseHandler.validationError(res, null, "Admin not found");
//     }

//     req.user = admin;
//     console.log("Authenticated Admin:", req.user);

//     next();
//   } catch (error: any) {
//     return ResponseHandler.validationError(res, null, "invalide token");
//   }
// };
