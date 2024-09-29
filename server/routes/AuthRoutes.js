import { Router } from "express";
import { addProfileImage, getUserInfo, login, signUp, updateProfile, removeProfileImage, logOut } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({dest:"uploads/profiles/"})
authRoutes.post("/signup",signUp);
authRoutes.post("/login",login);
authRoutes.get("/user-info",verifyToken,getUserInfo);
authRoutes.post("/update-profile",verifyToken,updateProfile);
authRoutes.post("/add-profile-image",verifyToken,upload.single("profile-image"),addProfileImage);
authRoutes.delete("/delete-profile-image",verifyToken,removeProfileImage);  
authRoutes.post("/logout",logOut);

export default authRoutes;
