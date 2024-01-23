import express from "express";
import {
  changeCurrentUserPassword,
  updateAccountDetails,
  changeUserAvatar,
  changeUserCoverImage,
} from "../controllers/updateAccount.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/avatar").post(upload.single("avatar"), changeUserAvatar);
router.route("/coverImage").post(upload.single("coverImage"), changeUserCoverImage);
router.route("/details").post(updateAccountDetails);
router.route("/password").post(changeCurrentUserPassword);

export default router;
