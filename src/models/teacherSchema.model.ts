import mongoose,{Schema,Document, mongo} from "mongoose";

export interface ITeacher extends Document{
    firstname: string,
    surname: string,
    email: string,
    password: string,
    isVerified: boolean,
    role: "teacher"
}

const teacherSchema:Schema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:[true,"Enter firstname"],
        },
        surname:{
            type:String,
            required:[true,"Enter surname"]
        },
        email:{
            unique:true,
            type:String,
            required:[true,"Enter email"]
        },
        password:{
            type:String,
            required:[true,"Enter password"]
        },
        role:{
            type:String,
            default:"teacher"
        },
        isVerified:{
            type:Boolean,
            default:true
        }
    },
    {timestamps:true}
)

const teacherModel = mongoose.model<ITeacher>("Teacher", teacherSchema)

export default teacherModel;