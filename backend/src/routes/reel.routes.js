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
router.route("/all").get(getReels);
router
  .route("/create")
  .post(upload.single("reelVideo"), validateData(createReelSchema), createReel);
router.route("/delete/:id").delete(isAuthorizedToDelete("REEL"), deleteReelById);
router.route("/:id").get(getReelById);

export default router;
