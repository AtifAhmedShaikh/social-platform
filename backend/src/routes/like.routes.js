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

router.route("/toggle/post/:id").patch(togglePostLike);
router.route("/toggle/reel/:id").patch(toggleReelLike);
router.route("/toggle/tweet/:id").patch(toggleTweetLike);
router.route("/toggle/comment/:id").patch(toggleCommentLike);

export default router;
