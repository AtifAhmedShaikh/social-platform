import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// apply authentication middleware in routes
router.use(authenticateUser);

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUserById);
router.route("/profiles/:username").get(userController.getUserProfile);
router.route("/current/user").get(userController.getCurrentUser);

export default router;
