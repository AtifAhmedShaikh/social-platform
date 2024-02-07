import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { findPostById } from "../services/post.service.js";
import { findReelById } from "../services/reel.service.js";
import { findTweetById } from "../services/tweet.service.js";
import LikeModel from "../models/Like.model.js";
import CommentModel from "../models/Comment.model.js";
import {
  stageToMatchDocumentById,
  stageToApplyProjectionInDocument,
  stageToAttachFieldsInUserDocument,
  stageToGetUserFollowers,
  stageToGetUserFollowing,
} from "../aggregations/fetchContentStages.js";

// get users list who is liked this specific post
const getPostLikedUsersList = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const targetedPost = await findPostById(postId, userId);
  if (!targetedPost) {
    throw new ApiError(404, "post not found!, Invalid post Id ");
  }
  const likedUsers = await LikeModel.aggregate([
    stageToMatchDocumentById("post", targetedPost._id),
    {
      $lookup: {
        from: "users",
        localField: "likedBy",
        foreignField: "_id",
        as: "likedBy",
        pipeline: [
          stageToGetUserFollowers(),
          stageToGetUserFollowing(),
          stageToAttachFieldsInUserDocument(userId),
          stageToApplyProjectionInDocument(
            "name:1,username:1,avatar:1,followerCount:1,followingCount:1,isFollowing:1",
          ),
        ],
      },
    },
    {
      $addFields: {
        likedBy: { $first: "$likedBy" },
      },
    },
    {
      $replaceRoot: { newRoot: "$likedBy" },
    },
    stageToApplyProjectionInDocument("_id,createdAt:0,updatedAt:0,__v:0,post:0"),
  ]);
  const responseInstance = new ApiResponse(
    200,
    { likedUsers },
    "post liked users fetched successfully",
  );
  res.status(200).json(responseInstance);
});

// get users list who is liked this specific reel
const getReelLikedUsersList = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const userId = req.user?._id;
  const targetedReel = await findReelById(reelId, userId);
  if (!targetedReel) {
    throw new ApiError(404, "reel not found!, Invalid reel Id ");
  }
  const likedUsers = await LikeModel.aggregate([
    stageToMatchDocumentById("reel", targetedReel._id),
    {
      $lookup: {
        from: "users",
        localField: "likedBy",
        foreignField: "_id",
        as: "likedBy",
        pipeline: [
          stageToGetUserFollowers(),
          stageToGetUserFollowing(),
          stageToAttachFieldsInUserDocument(userId),
          stageToApplyProjectionInDocument(
            "name:1,username:1,avatar:1,followerCount:1,followingCount:1,isFollowing:1",
          ),
        ],
      },
    },
    {
      $addFields: {
        likedBy: { $first: "$likedBy" },
      },
    },
    {
      $replaceRoot: { newRoot: "$likedBy" },
    },
    stageToApplyProjectionInDocument("_id,createdAt:0,updatedAt:0,__v:0,post:0"),
  ]);
  const responseInstance = new ApiResponse(
    200,
    { likedUsers },
    "reel liked users fetched successfully",
  );
  res.status(200).json(responseInstance);
});

// get users list who is liked this specific tweet
const getTweetLikedUsersList = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user?._id;
  const targetedTweet = await findTweetById(tweetId, userId);
  if (!targetedTweet) {
    throw new ApiError(404, "tweet not found!, Invalid tweet Id ");
  }
  const likedUsers = await LikeModel.aggregate([
    stageToMatchDocumentById("tweet", targetedTweet._id),
    {
      $lookup: {
        from: "users",
        localField: "likedBy",
        foreignField: "_id",
        as: "likedBy",
        pipeline: [
          stageToGetUserFollowers(),
          stageToGetUserFollowing(),
          stageToAttachFieldsInUserDocument(userId),
          stageToApplyProjectionInDocument(
            "name:1,username:1,avatar:1,followerCount:1,followingCount:1,isFollowing:1",
          ),
        ],
      },
    },
    {
      $addFields: {
        likedBy: { $first: "$likedBy" },
      },
    },
    {
      $replaceRoot: { newRoot: "$likedBy" },
    },
    stageToApplyProjectionInDocument("_id,createdAt:0,updatedAt:0,__v:0,post:0"),
  ]);
  const responseInstance = new ApiResponse(
    200,
    { likedUsers },
    "tweets liked users fetched successfully",
  );
  res.status(200).json(responseInstance);
});

// get users list who is liked this specific tweet
const getCommentLikedUsersList = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user?._id;
  const targetedComment = await CommentModel.findById(commentId);
  if (!targetedComment) {
    throw new ApiError(404, "comment not found!, Invalid comment Id ");
  }
  const likedUsers = await LikeModel.aggregate([
    stageToMatchDocumentById("comment", targetedComment._id),
    {
      $lookup: {
        from: "users",
        localField: "likedBy",
        foreignField: "_id",
        as: "likedBy",
        pipeline: [
          stageToGetUserFollowers(),
          stageToGetUserFollowing(),
          stageToAttachFieldsInUserDocument(userId),
          stageToApplyProjectionInDocument(
            "name:1,username:1,avatar:1,followerCount:1,followingCount:1,isFollowing:1",
          ),
        ],
      },
    },
    {
      $addFields: {
        likedBy: { $first: "$likedBy" },
      },
    },
    {
      $replaceRoot: { newRoot: "$likedBy" },
    },
    stageToApplyProjectionInDocument("_id,createdAt:0,updatedAt:0,__v:0,post:0"),
  ]);
  const responseInstance = new ApiResponse(
    200,
    { likedUsers },
    "tweets liked users fetched successfully",
  );
  res.status(200).json(responseInstance);
});

export {
  getPostLikedUsersList,
  getReelLikedUsersList,
  getTweetLikedUsersList,
  getCommentLikedUsersList,
};
