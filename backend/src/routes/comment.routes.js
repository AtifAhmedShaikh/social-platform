import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getReelComments,
  getPostComments,
  getTweetComments,
  addCommentOnPost,
  addCommentOnReel,
  addCommentOnTweet,
  updatePostComment,
  updateReelComment,
  updateTweetComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/post/:id").get(getPostComments).post(addCommentOnPost).patch(updatePostComment);
router.route("/reel/:id").get(getReelComments).post(addCommentOnReel).patch(updateReelComment);
router
  .route("/tweet/:id")
  .get(getTweetComments)
  .post(addCommentOnTweet)
  .patch(updateTweetComment);

export default router;
