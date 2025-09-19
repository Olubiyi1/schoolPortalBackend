
import adminModel from "../../models/adminSchema.model";
import { comparePassword, createJwt } from "../../guards/guards";

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
