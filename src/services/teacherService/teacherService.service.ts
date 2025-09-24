import teacherModel from "../../models/teacherSchema.model";
import { comparePassword, createJwt } from "../../guards/guards";
// import { error } from "console";

export const teacherLogin = async (email: string, password: string) => {
  try {
    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return { error: "invalid email or password", data: null };
    }

    const isPasswordValid = await comparePassword(password, teacher.password);

    if (!isPasswordValid) {
      return { error: "invalid email or password", data: null };
    }

    const token = createJwt({
      _id: teacher.id,
      email: teacher.email,
      role: teacher.role
    });

    console.log("token", token);
    console.log("generated token", token);

    return { error: null, data: token };
  } catch (error: any) {
    console.log("Login error", error.messgae);
    return { error: error.message };
  }
};
