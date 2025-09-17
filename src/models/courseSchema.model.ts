// import { required, string } from "joi";
import mongoose,{Schema,Document} from "mongoose";

export interface ICourse extends Document{
    courseTitle: string,
    courseCode:string,
    level: string
}

const courseSchema : Schema = new mongoose.Schema(
    {
        courseTitle:{
            type: String,
            required:[true,"emter course name"]
        },
        courseCode:{
            type:String,
            required: [true, "enter course code"]

        },
        level:{
            type:String,
            required:[true,"enter level"],
            enum:["Tech 1", "Tech 2", "Tech 3"]
        }
    },
    {timestamps:true}
)

const userCourse = mongoose.model<ICourse>("Course", courseSchema)

export default userCourse;