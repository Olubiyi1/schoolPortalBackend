import userModel,{IUser} from "../models/userSchema.model";
import { comparePassword, hashPassword, createJwt } from "../guards/guards";
import crypto from "crypto"
import sendVerificationEmail from "../helpers/sendEmail";



export const createUser = async (userData:IUser)=>{
    try{
        // checking if email already exist before creating a new one
        const existingUser = await userModel.findOne({email:userData.email});

        if(existingUser){
            return{error:"email already exists", data:null}
        }
        
        // hashing password before saving
        const password = hashPassword(userData.password)

        // generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // creating a new user
        const newUser =  new userModel({...userData,password, verificationToken, isVerified:false})

        // send verification mail
        await sendVerificationEmail(newUser.email, verificationToken);

        // savig new user created
        const savedUser =  await newUser.save()

         // creatjwt
         const token = createJwt(
            {
                id: savedUser.id,
                email:savedUser.email
            }
        )
        return { error:null, data:"Registration successful. Please check your email to verify your account."}
       
    }
    catch(error){
        console.error("registration error",error)
        return { error : "failed to register new user", data : null}
    }
}

// user login
export const userLogin =async (email:string,password:string)=>{
    try{
        // find user by email
        const user = await userModel.findOne({email});

        // if no user found with the email
        if(!user){
            return {error: "invalid email or password", data:null}
        }

         // Check if user is verified
        if (!user.isVerified) {
            return { error: "Please verify your email before logging in", data: null };
        }
  

        // verify password match
        const isPasswordValid = await comparePassword(password,user.password)
        if(!isPasswordValid){
            return {error :"invalid email or password",data:null}
        }

        // creatjwt
        const token = createJwt(
            {
                id: user.id,
                email:user.email
            }
        )
        return { error:null, data:token}

    }
    catch(error:any){
        return {error: error.message}
    }
}

// FORGOT PASSWORD
export const handleForgotPassword = async (email: string) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    return { error: "User with this email does not exist", data: null };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 mins

  user.resetPasswordToken = token;
  user.resetPasswordExpires = expires;
  await user.save();

  const resetLink = `http://localhost:3300/api/users/reset-password?token=${token}`;

  await sendVerificationEmail(user.email, token, "Reset Your Password", resetLink); // Modify `sendEmail` if needed

  return {
    error: null,
    data: "Reset password link sent to your email",
  };
};

// reset password
export const handleResetPassword = async (token: string, newPassword: string) => {
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

  return {
    error: null,
    data: "Password has been reset successfully",
  };
};