import express from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import TokenModel from "../models/Token.model.js";
const router = express.Router();

const uploadAvatar = {
  name: "avatar",
  maxCount: 1,
};
const uploadCoverImage = {
  name: "coverImage",
  maxCount: 1,
};

router.route("/register").post(upload.fields([uploadAvatar, uploadCoverImage]), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
// ! delete after fix it
router.route("/test").post(async (req, res) => {
  await TokenModel.deleteMany();
});
export default router;
