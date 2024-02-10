import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAuthorizedToReelModification } from "../middleware/authZ.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createReel,
  deleteReelById,
  getReels,
  getReelById,
} from "../controllers/reel.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/").get(getReels);
router.route("/:id").get(getReelById).delete(isAuthorizedToReelModification, deleteReelById);
router
  .route("/create")
  .post(upload.single("reelVideo"), createReel);

export default router;
