import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateData } from "../middleware/validation.middleware.js";
import { createTweetSchema } from "../validation/postSchema.js";
import {
  createTweet,
  deleteTweetById,
  getTweetById,
  getTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/all").get(getTweets);
router.route("/:id").get(getTweetById).put(updateTweet).delete(deleteTweetById);
router.route("/create").post(validateData(createTweetSchema), createTweet);// validate data before creating new tweet

export default router;
