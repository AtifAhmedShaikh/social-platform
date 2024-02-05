import asyncHandler from "../utils/asyncHandler.js";
import FollowModel from "../models/Follow.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { findUserById } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";

// follow and unfollow to user toggle
const followToggle = asyncHandler(async (req, res) => {
  const targetedUserId = req.params.id; // targeted user ID to follow and unfollow
  const followerId = req.user?._id; // current loggedIn user ID
  // ensure targeted user has exists in database
  const targetedUser = await findUserById(targetedUserId);
  if (!targetedUser) {
    throw new ApiError(404, "user not found, Invalid user ID ");
  }
  // check current user has already following targeted user
  const isFollowing = await FollowModel.findOne({
    user: targetedUserId,
    follower: followerId,
  }).populate("user");

  if (isFollowing) {
    // delete the document for unfollow this targeted user
    await FollowModel.deleteOne({ user: targetedUserId, follower: followerId });
    const responseInstance = new ApiResponse(200, {}, `You unfollow ${targetedUser.username}`);
    return res.status(200).json(responseInstance);
  } else {
    // create new document for follow this targeted user
    await FollowModel.create({ user: targetedUserId, follower: followerId });
    const responseInstance = new ApiResponse(200, {}, `You are now following ${targetedUser.username}`);
    return res.status(200).json(responseInstance);
  }
});

export { followToggle };
