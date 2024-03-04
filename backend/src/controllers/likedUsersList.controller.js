import mongoose from "mongoose";
import PostServices from "../services/post.service.js";
import ReelService from "../services/reel.service.js";
import TweetServices from "../services/tweet.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import LikeModel from "../models/Like.model.js";
import {
  calculateFollowerCountPipelines,
  calculateFollowingCountPipelines,
} from "../pipelines/followCountPipelines.js";

const getPostLikedUsersList = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const likedUsers = await PostServices.findPostLikedUsers(postId);
  if (!likedUsers?.length) {
    throw new ApiError(404, "No users liked this post");
  }
  new ApiResponse(200, { likedUsers }, "liked users are fetched successfully").send(res);
});

const getReelLikedUsersList = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const likedUsers = await ReelService.findReelLikedUsers(reelId);
  if (!likedUsers?.length) {
    throw new ApiError(404, "No users liked this reel ");
  }
  new ApiResponse(200, { likedUsers }, "liked users are fetched successfully").send(res);
});

const getTweetLikedUsersList = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const likedUsers = await TweetServices.findTweetLikedUsers(tweetId);
  if (!likedUsers?.length) {
    throw new ApiError(404, "No users liked this Tweet ");
  }
  new ApiResponse(200, { likedUsers }, "liked users are fetched successfully").send(res);
});

const getCommentLikedUsersList = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const likedUsers = await LikeModel.aggregate([
    // match stage to retrieve likes of provided comment  by comment ID
    { $match: { comment: new mongoose.Types.ObjectId(commentId) } },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "likedBy",
        as: "likedBy",
        // nested pipelines to get corresponding details of each user
        pipeline: [
          ...calculateFollowerCountPipelines(), // pipelines to get followers count of each user
          ...calculateFollowingCountPipelines(), // pipelines to get following count each user
        ],
      },
    },
    { $addFields: { likedBy: { $first: "$likedBy" } } },
    { $replaceRoot: { newRoot: "$likedBy" } },
  ]);
  if (!likedUsers?.length) {
    throw new ApiError(404, "No users liked this Tweet ");
  }
  new ApiResponse(200, { likedUsers }, "liked users are fetched successfully").send(res);
});

export {
  getPostLikedUsersList,
  getReelLikedUsersList,
  getTweetLikedUsersList,
  getCommentLikedUsersList,
};
