import userModel from "../models/userSchema.model";
import { Request, Response } from "express";
import ResponseHandler from "../utils/responseHandlers";

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  try {
    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return ResponseHandler.notFound(res, null, "Invalid or expired token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return ResponseHandler.success(res, null, "Email verified successfully");
  } catch (error: any) {
    return ResponseHandler.error(res, null, "Failed to verify email");
  }
};
