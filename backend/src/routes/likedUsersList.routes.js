import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getPostLikedUsersList,
  getReelLikedUsersList,
  getTweetLikedUsersList,
  getCommentLikedUsersList,
} from "../controllers/likedUsersList.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/post/:id").get(getPostLikedUsersList);
router.route("/reel/:id").get(getReelLikedUsersList);
router.route("/tweet/:id").get(getTweetLikedUsersList);
router.route("/comment/:id").get(getCommentLikedUsersList);

export default router;
