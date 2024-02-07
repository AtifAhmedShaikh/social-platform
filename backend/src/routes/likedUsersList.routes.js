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

// Endpoints to fetch users list who is liked the corresponding content

router.route("/post/:id").get(getPostLikedUsersList);
router.route("/tweet/:id").get(getTweetLikedUsersList);
router.route("/reel/:id").get(getReelLikedUsersList);
router.route("/comment/:id").get(getCommentLikedUsersList);

export default router;
