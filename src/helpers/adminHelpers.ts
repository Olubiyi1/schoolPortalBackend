import userModel from "../models/userSchema.model";
import bcrypt from "bcrypt";

export const ensureDefaultAdmin = async () => {
  const existingAdmin = await userModel.findOne({ email: "admin@school.com" });
  if (existingAdmin) return; // Admin already exists, do nothing

  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  const admin = new userModel({
    firstname: "Super",
    surname: "Admin",
    username: "admin",
    email: "admin@school.com",
    password: hashedPassword,
    role: "admin",
  });

  await admin.save();
  console.log("Default admin created successfully");
};
