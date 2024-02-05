import express from "express";
import { authenticateUser, isAuthorizedToDelete } from "../middleware/auth.middleware.js";
import {
  createTweet,
  deleteTweetById,
  getTweetById,
  getTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/").get(getTweets);
router
  .route("/:id")
  .get(getTweetById)
  .put(updateTweet)
  .delete(isAuthorizedToDelete("TWEET"), deleteTweetById);
router.route("/create").post(createTweet); // validate data before creating new tweet

export default router;
