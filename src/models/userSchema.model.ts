import { boolean, string } from "joi";
import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    firstname: string,
    surname:string,
    email:string,
    username:string,
    password:string,
    department:string,
    isVerified: boolean,
    verificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const userSchema:Schema = new mongoose.Schema(
    {
        "firstname":{
            type:String,
            required:[true,"enter firstname"]
        },
        "surname":{
            type:String,
            required:[true,"enter surname"]
        },
        
        "email":{
            unique:true,
            type:String,
            required:[true,"enter email"]
        },

        "username":{
            unique:true,
            type:String,
            required:[true,"enter username"]
        },
        
        "password":{
            type:String,
            required:[true,"enter password"]
        },

        "department":{
            type:String,
            required:[true,"enter department"]
        },
        "isVerified":{
            type : Boolean,
            default: false
        },
        "verificationToken":{
            type:String
        },
        "resetPasswordToken": {
            type:  String,
            default : null
        },

        "resetPasswordExpires":{
            type: Date,
            default: null
        }
    },
    {timestamps:true}
)

const userModel = mongoose.model<IUser>("User",userSchema)

export default userModel;