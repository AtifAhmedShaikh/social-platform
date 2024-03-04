import asyncHandler from "../utils/asyncHandler.js";
import FollowModel from "../models/Follow.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserServices from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";

const followToUser = asyncHandler(async (req, res) => {
  const targetedUserIdToFollow = req.params.id; // user to follow
  const follower = req.user._id; // get loggedIn user id as follower
  const targetedUserToFollow = await UserServices.findUserById(targetedUserIdToFollow);
  if (!targetedUserToFollow) {
    throw new ApiError(404, "User not found, Invalid user ID ");
  }
  // check the current user has already following targeted user
  const hasFollowedByCurrentUser = await FollowModel.findOne({
    user: targetedUserIdToFollow,
    follower: follower,
  });
  if (hasFollowedByCurrentUser) {
    throw new ApiError(409, `you are already following the ${targetedUserToFollow.username}`);
  }
  const createdFollower = await FollowModel.create({
    user: targetedUserIdToFollow,
    follower: follower,
  });
  if (!createdFollower) {
    throw new ApiError(500, "Some thing went wrong while following ");
  }
  new ApiResponse(200, {}, `You are now following ${targetedUserToFollow.username}`).send(res);
});

const unfollowToUser = asyncHandler(async (req, res) => {
  const targetedUserId = req.params.id; // targeted user ID to unfollow
  const follower = req.user?._id; // current loggedIn user ID as follower

  // ensure targeted user has exists in database
  const targetedUserToUnfollow = await UserServices.findUserById(targetedUserId);
  if (!targetedUserToUnfollow) {
    throw new ApiError(404, "User not found, Invalid user ID ");
  }
  // check current user has already following the targeted user
  const hasFollowedByCurrentUser = await FollowModel.findOne({
    user: targetedUserId,
    follower: follower,
  });

  if (!hasFollowedByCurrentUser) {
    throw new ApiError(409, `you are not following the ${targetedUserToUnfollow.username}`);
  }
  const deletedFollowDocument = await FollowModel.deleteOne({
    user: targetedUserId,
    follower: follower,
  });
  if (!deletedFollowDocument) {
    throw new ApiError(500, "Some thing went wrong while unfollow the user ");
  }
  new ApiResponse(200, {}, `You unfollow the ${targetedUserToUnfollow.username}`).send(res);
});

const getUserFollowersList = asyncHandler(async (req, res) => {
  const userId = req.params.id; // get user id to find his followers list
  const followersList = await UserServices.findUserFollowersList(userId);
  new ApiResponse(200, { followers: followersList }, "followers users list fetched ").send(res);
});

const getUserFollowingList = asyncHandler(async (req, res) => {
  const userId = req.params.id; // get user id to find his following list
  const followingList = await UserServices.findUserFollowingList(userId);
  new ApiResponse(200, { followers: followingList }, "following users list fetched ").send(res);
});

export { followToUser, unfollowToUser, getUserFollowersList, getUserFollowingList };
