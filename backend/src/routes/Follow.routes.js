import express from "express";
import { followToggle } from "../controllers/follow.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import FollowModel from "../models/Follow.model.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/toggle/:id").post(followToggle);
// router.route("/followers/:id").get(getUserFollowers);toggleUserFollow
// router.route("/following/:id").get(getUserFollowers);
router.route("/test").get(async (req, res) => {
  await FollowModel.deleteMany();
});
export default router;
