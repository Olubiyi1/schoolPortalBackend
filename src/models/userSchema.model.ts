import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    firstname: string,
    surname:string,
    email:string,
    username:string,
    password:string,
    department?:string,
    level:string,
    isVerified: boolean,
    verificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    role: "student" 

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
            required:[true,"enter email"],

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
            required:[true,"enter department"],
            enum:["Electronics", "RAC"]
        },

        "level":{
            type:String,
            required:[true, "enter level"],
            enum:["Tech 1", "Tech 2", "Tech 3"]
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
        },

        "role":{
            type: String,
            enum: ["student"],
            default: "student"
        }
    },
    {timestamps:true}
)

const userModel = mongoose.model<IUser>("User",userSchema)

export default userModel;