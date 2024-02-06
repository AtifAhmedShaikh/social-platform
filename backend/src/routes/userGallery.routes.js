import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getUserGallery,
  togglePostInUserGallery,
  toggleReelInUserGallery,
  toggleTweetInUserGallery,
} from "../controllers/userGallery.controller.js";

const router = express.Router();

router.use(authenticateUser);

// endpoint to get user gallery from database
// router.route("/:id").get(()=>{})
router.route("/toggle/post/:id").post(togglePostInUserGallery);
router.route("/toggle/reel/:id").post(toggleReelInUserGallery);
router.route("/toggle/tweet/:id").post(toggleTweetInUserGallery);
router.route("/").get(getUserGallery);

export default router;
