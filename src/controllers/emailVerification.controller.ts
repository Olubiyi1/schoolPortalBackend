import userModel from "../models/userSchema.model";
import { Request, Response } from "express";
import ResponseHandler from "../utils/responseHandlers";
import crypto from "crypto"
import bcrypt from "bcrypt"
import emailTransporter from "../helpers/emailTransporter";

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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return ResponseHandler.notFound(res, null, "User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry =new Date( Date.now() + 60 * 60 * 1000); // 1 hour expiry

    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;

    await user.save();

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await emailTransporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset</p>
             <p>Click this <a href="${resetLink}">link</a> to reset your password.</p>`
    });

    return ResponseHandler.success(res, null, "Reset email sent");
  } catch (error) {
    console.error(error);
    return ResponseHandler.error(res, null, "Error sending reset email");
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return ResponseHandler.notFound(res, null, "Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return ResponseHandler.success(res, null, "Password reset successful");
  } catch (error) {
    console.error(error);
    return ResponseHandler.error(res, null, "Error resetting password");
  }
};