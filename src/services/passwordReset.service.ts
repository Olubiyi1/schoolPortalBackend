import crypto from "crypto";
import userModel from "../models/userSchema.model";
import sendEmail from "../helpers/sendEmail";
import { hashPassword } from "../guards/guards";

export const handleForgotPassword = async (email:string)=>{

    const user = await userModel.findOne({email})
    if (!user){

        return {error : "user doesn't exist", data:null}
    }

    const token = crypto.randomBytes(32).toString("hex");

    // expires every 15minutes
    const expires = new Date(Date.now() + 15 * 60 *1000)

    // reset messeage
    const resetMessage = "Use this Link to reset your password"

    user.resetPasswordToken = token
    user.resetPasswordExpires = expires

    await user.save()

    const resetLink = `http://localhost:3300/api/users/reset-password?token=${token}`;
        
    await sendEmail(user.email, token, resetMessage, resetLink);

     return { error: null, data: "Reset password link sent to your email" };

}

export const handleResetPassword = async (token: string, newPassword: string) => {
  const user = await userModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) return { error: "Invalid or expired token", data: null };

  user.password = hashPassword(newPassword);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { error: null, data: "Password reset successful" };
};