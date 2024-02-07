import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { getUserHistory } from "../controllers/userHistory.controller.js";

const router = express.Router();

router.use(authenticateUser);

// Endpoint to get current user history which contains his liked posts,reels,tweets and reels watch history
router.route("/").get(getUserHistory);

export default router;
