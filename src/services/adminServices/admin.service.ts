import adminModel,{IAdmin} from "../../models/adminSchema.model";
import { comparePassword, hashPassword,createJwt } from "../../guards/guards";

export const adminLogin = async(email:string, password:string)=>{
    try{
        const admin = await adminModel.findOne({email})
        if(!admin){
            return {error: "invalid email or password", data:null}
        }
        const isPasswordValid = await comparePassword(password,admin.password)

        if(!isPasswordValid){
            return {error: "invalid email or password", data:null}
        }

        const token = createJwt({
            _id: admin.id,
            email: admin.email
        });
        return {error: null, data:token}

    }
    catch(error:any){
        return {error: error.message}
    }

}