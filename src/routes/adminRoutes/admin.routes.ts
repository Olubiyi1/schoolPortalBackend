import express from "express";
import { loginAdmin } from "../../controllers/adminControllers/admin.controller";
// import { authorizeAccess } from "../../middlewares/adminMiddleware/authorizeAccess";

const adminRouter = express.Router();

// Test route
adminRouter.get("/", (req, res) => {
  res.send("Admin routes up and running");
});

// Admin login
adminRouter.post("/login", loginAdmin);


export default adminRouter;

