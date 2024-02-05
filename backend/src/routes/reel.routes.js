import express from "express";
import { authenticateUser, isAuthorizedToDelete } from "../middleware/auth.middleware.js";
import { validateData } from "../middleware/validation.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createReel,
  deleteReelById,
  getReels,
  getReelById,
} from "../controllers/reel.controller.js";
import { createReelSchema } from "../validation/postSchema.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/").get(getReels);
router.route("/:id").get(getReelById).delete(isAuthorizedToDelete("REEL"), deleteReelById);
router
  .route("/create")
  .post(upload.single("reelVideo"), validateData(createReelSchema), createReel);

export default router;
