import LikeModel from "../models/Like.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Toggle controllers for like, if already liked by current user so unlike it otherwise like

const togglePostLike = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const hasLiked = await LikeModel.findOne({ post: postId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.deleteOne({ post: postId, likedBy: userId });
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
  const hasLiked = await LikeModel.findOne({ reel: reelId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.deleteOne({ reel: reelId, likedBy: userId });
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
  const hasLiked = await LikeModel.findOne({ tweet: tweetId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.deleteOne({ tweet: tweetId, likedBy: userId });
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
  const hasLiked = await LikeModel.findOne({ comment: commentId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.deleteOne({ comment: commentId, likedBy: userId });
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
