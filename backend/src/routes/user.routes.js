import express from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const router = express.Router();

// apply authentication middleware in routes
router.use(authenticateUser);

router.route("/").get(getUsers);
router.route("/user/:id").get(getUserById);

export default router;
