import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAuthorizedToCommentModification } from "../middleware/authZ.middleware.js";
import { validateData } from "../middleware/validation.middleware.js";
import { commentSchema } from "../schema/contentSchema.js";
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

router.route("/post/:id").get(getPostComments).post(validateData(commentSchema), addCommentOnPost);
router.route("/reel/:id").get(getReelComments).post(validateData(commentSchema), addCommentOnReel);
router
  .route("/tweet/:id")
  .get(getTweetComments)
  .post(validateData(commentSchema), addCommentOnTweet);

router
  .route("/:id")
  .put(isAuthorizedToCommentModification, validateData(commentSchema), updateComment)
  .delete(isAuthorizedToCommentModification, deleteComment);

export default router;
