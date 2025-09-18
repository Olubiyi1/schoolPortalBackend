
import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  firstname: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  role: "student";
}

const adminSchema: Schema = new mongoose.Schema({
  "firstname": {
    type: String,
    required: true,
  },
  "surname": {
    type: String,
    required: true,
  },
  "email": {
    type: String,
    required: true,
  },
  "username": {
    type: String,
    required: true,
  },
  "password":{
    type: String,
    required: true
  },
  "resetPasswordToken":{
    type:String,
  },
  "resetPasswordExpires":{
    type:String,
  },
  "role":{
    type: String,
    enum:["admin"],
    default: true
  }
  
},{timestamps:true}
);

const adminModel = mongoose.model<IAdmin>("Admin",adminSchema)

export default adminModel;



