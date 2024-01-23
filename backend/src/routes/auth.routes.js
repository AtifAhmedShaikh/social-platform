import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateData } from "../middleware/validation.middleware.js";
import { userRegistrationSchema } from "../validation/userSchema.js";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// configure multer fields to upload avatar and coverImage
const uploadImages = upload.fields([
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "coverImage",
    maxCount: 1,
  },
]);

router.route("/register").post(uploadImages, validateData(userRegistrationSchema), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
