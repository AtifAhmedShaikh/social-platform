import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { validateData } from "../middleware/validation.middleware.js";
import { userUpdateAccountDetailsSchema, changePasswordSchema } from "../schema/userSchema.js";
import * as editController from "../controllers/editProfile.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/avatar").post(upload.single("avatar"), editController.changeUserAvatar);
router.route("/coverImage").post(upload.single("coverImage"), editController.changeUserCoverImage);
router
  .route("/details")
  .post(validateData(userUpdateAccountDetailsSchema), editController.updateAccountDetails);
router
  .route("/password")
  .post(validateData(changePasswordSchema), editController.changeCurrentUserPassword);

export default router;
