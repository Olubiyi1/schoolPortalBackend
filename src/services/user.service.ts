import userModel,{IUser} from "../models/userSchema.model";
import { hashPassword } from "../guards/guards";
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
        
        return { error : null, data:savedUser}
       
    }
    catch(error){
        console.error("registration error",error)
        return { error : "failed to register new user", data : null}
    }
}

// user logim
export const userLogin = ()=>{
    try{

    }
    catch(error){

    }
}