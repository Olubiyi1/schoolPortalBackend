import adminModel from "../../models/adminSchema.model";
import { comparePassword, createJwt } from "../../guards/guards";
import teacherModel from "../../models/teacherSchema.model";
import { hashPassword } from "../../guards/guards";
import userModel from "../../models/userSchema.model";
import { error } from "console";

export const adminLogin = async (email: string, password: string) => {
  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return { error: "invalid email or password", data: null };
    }

    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return { error: "invalid email or password", data: null };
    }

    const token = createJwt({
      _id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    // Debug logging
    console.log("Token:", token);
    console.log("Generated token:", token);

    return { error: null, data: token };
  } catch (error: any) {
    console.log("Login error:", error.message);
    return { error: error.message };
  }
};

// creating teacher
// the parameter teacherData culd be anything but make sure its referenced
export const createTeacher = async (teacherData: any) => {
  try {
    const existingTeacher = await teacherModel.findOne({
      email: teacherData.email,
    });
    const hashedPassword = hashPassword(teacherData.password);

    if (existingTeacher) {
      return { error: "Teacher already exists", data: null };
    }

    //create new teacher
    const newTeacher = new teacherModel({
      firstname: teacherData.firstname,
      surname: teacherData.surname,
      email: teacherData.email,
      password: hashedPassword,
      role: "teacher",
      isVerified: teacherData.isVerified,
    });

    // save new teacher
    const saveTeacher = await newTeacher.save();
    return { error: null, data: saveTeacher };
  } catch (error: any) {
    console.log("Teacher creation error:", error);
    return { error: error.message, data: null };
  }
};

// creating students

export const createStudents = async (studentData: any) => {
  try {
    const existingStudent = await userModel.findOne({
      email: studentData.email,
    });
    const hashedPassword = hashPassword(studentData.password);

    if (existingStudent) {
      return { error: "Student already existd", data: null };
    }

    // create new stdent
    const newStudent = new userModel({
      firstname: studentData.firstname,
      surname: studentData.surname,
      email: studentData.email,
      password: hashedPassword,
      username: studentData.username,
      role: "student",
      department: studentData.department,
      level: studentData.level,
      semester: studentData.semester,
      isVerified: true,
      admissionNumber: studentData.admissionNumber,
      gender: studentData.gender,
    });

    // save student
    const savedStudent = await newStudent.save();
    return { error: error, data: savedStudent };
  } catch (error: any) {
    console.log("Teacher creation error:", error);
    return { error: error.message, data: null };
  }
};

// delete teacher
export const deleteTeacher = async (id: string) => {
  try {
    const deletedTeacher = await teacherModel.findByIdAndDelete(id);

    if(!deletedTeacher){

      return {error:"teacher not found", data:null}
    }
    return { error: null, data: deletedTeacher };
  } catch (error:any) {
    return { error: error.message, data: null };
  }
};


// delete student

export const deleteStudent = async(id:string)=>{
try{

  const deletedStudent = await userModel.findByIdAndDelete(id)

  if(!deletedStudent){

    return {error:"student not found", data:null}
  }
  return {error:null, data:deletedStudent}

}
catch(error:any){
  return {error:error.message, data:null}
}

}