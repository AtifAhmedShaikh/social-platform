import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAuthorizedToTweetModification } from "../middleware/authZ.middleware.js";
import * as tweetController from "../controllers/tweet.controller.js";
import { validateData } from "../middleware/validation.middleware.js";
import { tweetSchema } from "../schema/contentSchema.js";

const router = express.Router();

router.use(authenticateUser);

router
  .route("/")
  .get(tweetController.getTweets)
  .post(validateData(tweetSchema), tweetController.createTweet);

router
  .route("/:id")
  .get(tweetController.getTweetById)
  .put(isAuthorizedToTweetModification, validateData(tweetSchema), tweetController.updateTweet)
  .delete(isAuthorizedToTweetModification, tweetController.deleteTweetById);

export default router;
