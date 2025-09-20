// import { required, string } from "joi";
import mongoose,{Schema,Document} from "mongoose";

export interface ICourse extends Document{
    title: string,
    code:string,
    level: string,
    semester: string,
    department: string
}

const courseSchema : Schema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:[true,"emter course name"]
        },
        code:{
            type:String,
            required: [true, "enter course code"]

        },
        level:{
            type:String,
            required:[true,"enter level"],
            enum:["Tech 1", "Tech 2", "Tech 3"]
        },
        semester:{
            type: String,
            required:[true,"enter semester"],
            enum:["First Term", "Second Term", "Third Term"]
        },
        department:{
            type: String,
            required:[true, "enter your department"],
            enum:["Electronics works", "RAC"]
        }
    },
    {timestamps:true}
)

const userCourse = mongoose.model<ICourse>("Course", courseSchema)

export default userCourse;