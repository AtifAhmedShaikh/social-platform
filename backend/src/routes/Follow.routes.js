import express from "express";
import * as followController from "../controllers/follow.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import FollowModel from "../models/Follow.model.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/follow/:id").post(followController.followToUser);
router.route("/unfollow/:id").post(followController.unfollowToUser);
router.route("/followers/:id").get(followController.getUserFollowersList);
router.route("/following/:id").get(followController.getUserFollowingList);
router.route("/test").get(async (req, res) => {
  await FollowModel.deleteMany({});
});

export default router;
