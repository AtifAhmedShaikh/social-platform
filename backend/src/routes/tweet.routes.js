import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAuthorizedToTweetModification } from "../middleware/authZ.middleware.js";
import {
  createTweet,
  deleteTweetById,
  getTweetById,
  getTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";
import { validateData } from "../middleware/validation.middleware.js";
import { tweetSchema } from "../validation/contentSchema.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/").get(getTweets);
router
  .route("/:id")
  .get(getTweetById)
  .put(isAuthorizedToTweetModification, validateData(tweetSchema), updateTweet)
  .delete(isAuthorizedToTweetModification, deleteTweetById);
router.route("/create").post(validateData(tweetSchema), createTweet); // validate data before creating new tweet

export default router;
