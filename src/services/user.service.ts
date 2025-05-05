import userModel,{IUser} from "../models/userSchema.model";
import { hashPassword } from "../guards/guards";


export const createUser = async (userData:IUser)=>{
    try{
        // checking if email already exist before creating a new one
        const existingUser = await userModel.findOne({email:userData.email});

        if(existingUser){
            return{error:"email already exists", data:null}
        }
        
        // hashing password before saving
        const password = hashPassword(userData.password)

        // creating a new user
        const newUser =  new userModel({...userData,password})

        // savig new user created
        const savedUser =  await newUser.save()
        return { error : null, data:savedUser}
       
    }
    catch(error){
        return { error : "failed to register new user", data : null}
    }
}
