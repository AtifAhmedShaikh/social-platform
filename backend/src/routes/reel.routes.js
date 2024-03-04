import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAuthorizedToReelModification } from "../middleware/authZ.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import * as reelController from "../controllers/reel.controller.js";
import { validateData } from "../middleware/validation.middleware.js";
import { reelSchema } from "../schema/contentSchema.js";

const router = express.Router();

router.use(authenticateUser);

router
  .route("/")
  .get(reelController.getReels)
  .post(upload.single("reelVideo"), validateData(reelSchema), reelController.createReel);
router
  .route("/:id")
  .get(reelController.getReelById)
  .put(isAuthorizedToReelModification, validateData(reelSchema), reelController.updateReel)
  .delete(isAuthorizedToReelModification, reelController.deleteReelById);

export default router;
