import userModel, { IUser } from "../models/userSchema.model";
import { comparePassword, hashPassword, createJwt } from "../guards/guards";
import crypto from "crypto";
import {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendResetPasswordSuccessEmail,
} from "../helpers/sendEmail";

export const createUser = async (userData: IUser) => {
  try {
    // checking if email already exist before creating a new one
    const existingUser = await userModel.findOne({ email: userData.email });
    const existingUsername = await userModel.findOne({
      username: userData.username,
    });

    if (existingUser) {
      return { error: "email already exists", data: null };
    }
    if (existingUsername) {
      return { error: "username already exists", data: null };
    }

    // hashing password before saving
    const password = hashPassword(userData.password);

    // generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // creating a new user
    const newUser = new userModel({
      ...userData,
      password,
      verificationToken,
      isVerified: false,
    });

    // send verification mail
    await sendVerificationEmail(newUser.email, verificationToken);

    // savig new user created
    const savedUser = await newUser.save();

    // creatjwt
    const token = createJwt({
      _id: savedUser.id,
      email: savedUser.email,
    });

    console.log(token);
    return {
      error: null,
      data: "Registration successful. Please check your email to verify your account.",
      token,
    };
  } catch (error) {
    console.error("registration error", error);
    return { error: "failed to register new user", data: null };
  }
};

// user login
export const userLogin = async (email: string, password: string) => {
  try {
    // find user by email
    const user = await userModel.findOne({ email });

    // if no user found with the email
    if (!user) {
      return { error: "invalid email or password", data: null };
    }

    // Check if user is verified
    if (!user.isVerified) {
      return {
        error: "Please verify your email before logging in",
        data: null,
      };
    }

    // verify password match
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { error: "invalid email or password", data: null };
    }

    // creatjwt
    const token = createJwt({
      _id: user.id,
      email: user.email,
    });
    return { error: null, data: token };
  } catch (error: any) {
    return { error: error.message };
  }
};

// to get single user
export const getCurrentUserProfile = async (userId: string) => {
  try {
    const user = await userModel.findById(userId).select('-password -verificationToken -resetPasswordToken');
    
    if (!user) {
      return { error: "User not found", data: null };
    }

    return {
      error: null,
      data: {
        firstName: user.firstname,
        surname: user.surname,
        email: user.email,
        department: user.department,
        username: user.username,
        level:user.level,
        semester:user.semester
      }
    };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
};

// FORGOT PASSWORD
export const handleForgotPassword = async (email: string) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return { error: "User with this email does not exist", data: null };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    await sendForgotPasswordEmail(user.email, token);

    return {
      error: null,
      data: "Reset password link sent to your email.",
    };
  } catch (error) {
    // console.error("Forgot password error:", error);
    return { error: "Failed to initiate password reset", data: null };
  }
};
// RESET PASSWORD
export const handleResetPassword = async (
  token: string,
  newPassword: string
) => {
  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return { error: "Invalid or expired token", data: null };
    }

    user.password = hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    await sendResetPasswordSuccessEmail(user.email);

    return {
      error: null,
      data: "Password has been reset successfully.",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Failed to reset password", data: null };
  }
};
