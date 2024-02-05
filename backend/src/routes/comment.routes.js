import express from "express";
import { authenticateUser, isAuthorizedToDelete } from "../middleware/auth.middleware.js";
import {
  getReelComments,
  getPostComments,
  getTweetComments,
  addCommentOnPost,
  addCommentOnReel,
  addCommentOnTweet,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/post/:id").get(getPostComments).post(addCommentOnPost);
router.route("/reel/:id").get(getReelComments).post(addCommentOnReel);
router.route("/tweet/:id").get(getTweetComments).post(addCommentOnTweet);
router.route("/:id").put(updateComment).delete(isAuthorizedToDelete("COMMENT"), deleteComment);

export default router;
