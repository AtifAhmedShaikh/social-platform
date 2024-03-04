import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateData } from "../middleware/validation.middleware.js";
import { userRegistrationSchema, userLoginSchema } from "../schema/userSchema.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

// configure multer fields to receive avatar and coverImage Images from frontend
const uploadImages = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

router
  .route("/register")
  .post(uploadImages, validateData(userRegistrationSchema), authController.registerUser);

router.route("/login").post(validateData(userLoginSchema), authController.loginUser);
router.route("/logout").post(authenticateUser, authController.logoutUser);
router.route("/refresh-token").post(authController.refreshAccessToken);

export default router;
