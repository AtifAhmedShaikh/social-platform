import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  toggleCommentLike,
  togglePostLike,
  toggleReelLike,
  toggleTweetLike,
} from "../controllers/like.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/toggle/post/:id").post(togglePostLike);
router.route("/toggle/reel/:id").post(toggleReelLike);
router.route("/toggle/tweet/:id").post(toggleTweetLike);
router.route("/toggle/comment/:id").post(toggleCommentLike);

export default router;
