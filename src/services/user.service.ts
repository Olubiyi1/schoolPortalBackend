import userModel,{IUser} from "../models/userSchema.model";
import { comparePassword, hashPassword, createJwt } from "../guards/guards";
import crypto from "crypto"
import sendVerificationEmail from "../helpers/sendVerficationMail";



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
        const newUser =  new userModel({...userData,password, verificationToken})

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
        return { error:null, data:token}
        
        // return { error : null, data:savedUser}
       
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