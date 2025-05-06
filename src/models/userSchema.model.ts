import { boolean, string } from "joi";
import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    firstname: string,
    lastname:string,
    email:string,
    username:string,
    password:string,
    section:string,
    isVerified: boolean,
    verificationToken?: string;
}

const userSchema:Schema = new mongoose.Schema(
    {
        "firstname":{
            type:String,
            required:[true,"enter firstname"]
        },
        "lastname":{
            type:String,
            required:[true,"enter lastname"]
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

        "section":{
            type:String,
            required:[true,"enter section"]
        },
        "isVerified":{
            type : Boolean,
            default: false
        },
        "verificationToken":{
            type:String
        }
    },
    {timestamps:true}
)

const userModel = mongoose.model<IUser>("User",userSchema)

export default userModel;