import express from "express";
import { getCurrentUser, getUserById, getUserProfile, getUsers } from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// apply authentication middleware in routes
router.use(authenticateUser);

router.route("/").get(getUsers);
router.route("/:id").get(getUserById);
router.route("/profiles/:username").get(getUserProfile);
router.route("/current/user").get(getCurrentUser);

export default router;
