import LikeModel from "../models/Like.model.js";
import CommentModel from "../models/Comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { findPostById } from "../services/post.service.js";
import { findReelById } from "../services/reel.service.js";
import { findTweetById } from "../services/tweet.service.js";
// Toggle controllers for like, if already liked by current user so unlike it otherwise like

const togglePostLike = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const targetedPostToLike = await findPostById(postId, userId);
  if (!targetedPostToLike) {
    throw new ApiError(404, "post not found!, Invalid post Id ");
  }
  const hasLiked = await LikeModel.findOne({ post: postId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.findOneAndDelete({ post: postId, likedBy: userId });
  } else {
    await LikeModel.create({ post: postId, likedBy: userId });
  }
  const responseInstance = new ApiResponse(
    200,
    {},
    `user ${hasLiked ? "unlike" : "Liked"} the post successfully`,
  );
  res.status(200).json(responseInstance);
});

const toggleReelLike = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const userId = req.user?._id;
  const targetedReelToLike = await findReelById(reelId, userId);
  if (!targetedReelToLike) {
    throw new ApiError(404, "reel not found!, Invalid reel Id ");
  }
  const hasLiked = await LikeModel.findOne({ reel: reelId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.findOneAndDelete({ reel: reelId, likedBy: userId });
  } else {
    await LikeModel.create({ reel: reelId, likedBy: userId });
  }
  const responseInstance = new ApiResponse(
    200,
    {},
    `user ${hasLiked ? "unlike" : "Liked"} the reel successfully`,
  );
  res.status(200).json(responseInstance);
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user?._id;
  const targetedTweetToLike = await findTweetById(tweetId, userId);
  if (!targetedTweetToLike) {
    throw new ApiError(404, "tweet not found!, Invalid tweet Id ");
  }

  const hasLiked = await LikeModel.findOne({ tweet: tweetId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.findOneAndDelete({ tweet: tweetId, likedBy: userId });
  } else {
    await LikeModel.create({ tweet: tweetId, likedBy: userId });
  }
  const responseInstance = new ApiResponse(
    200,
    {},
    `user ${hasLiked ? "unlike" : "Liked"} the tweet successfully`,
  );
  res.status(200).json(responseInstance);
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user?._id;
  const targetedCommentToLike = await CommentModel.findById(commentId);
  if (!targetedCommentToLike) {
    throw new ApiError(404, "comment not found!, Invalid comment Id ");
  }
  const hasLiked = await LikeModel.findOne({ comment: commentId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.findOneAndDelete({ comment: commentId, likedBy: userId });
  } else {
    await LikeModel.create({ comment: commentId, likedBy: userId });
  }
  const responseInstance = new ApiResponse(
    200,
    {},
    `user ${hasLiked ? "unlike" : "Liked"} the comment successfully`,
  );
  res.status(200).json(responseInstance);
});

export { togglePostLike, toggleCommentLike, toggleTweetLike, toggleReelLike };
