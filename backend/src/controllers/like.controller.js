import LikeModel from "../models/Like.model.js";
import CommentModel from "../models/Comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import PostServices from "../services/post.service.js";
import TweetServices from "../services/tweet.service.js";
import ReelServices from "../services/reel.service.js";
// Toggle controllers for like, if already liked by current user so unlike it otherwise like

const togglePostLike = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const targetedPostToLike = await PostServices.findPostById(postId);
  if (!targetedPostToLike) {
    throw new ApiError(404, "post not found!, Invalid post Id ");
  }
  const hasLiked = await LikeModel.findOne({ post: postId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.findOneAndDelete({ post: postId, likedBy: userId });
  } else {
    await LikeModel.create({ post: postId, likedBy: userId });
  }
  new ApiResponse(200, {}, `${hasLiked ? "DisLike " : "Like "} the Post successfully !`).send(res);
});

const toggleReelLike = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const userId = req.user?._id;
  const targetedReelToLike = await ReelServices.findReelById(reelId);
  if (!targetedReelToLike) {
    throw new ApiError(404, "reel not found!, Invalid reel Id ");
  }
  const hasLiked = await LikeModel.findOne({ reel: reelId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.findOneAndDelete({ reel: reelId, likedBy: userId });
  } else {
    await LikeModel.create({ reel: reelId, likedBy: userId });
  }
  new ApiResponse(200, {}, `${hasLiked ? "DisLike " : "Like "} the Reel successfully !`).send(res);
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user?._id;
  const targetedTweetToLike = await TweetServices.findTweetById(tweetId);
  if (!targetedTweetToLike) {
    throw new ApiError(404, "tweet not found!, Invalid tweet Id ");
  }

  const hasLiked = await LikeModel.findOne({ tweet: tweetId, likedBy: userId });
  if (hasLiked) {
    await LikeModel.findOneAndDelete({ tweet: tweetId, likedBy: userId });
  } else {
    await LikeModel.create({ tweet: tweetId, likedBy: userId });
  }
  new ApiResponse(200, {}, `${hasLiked ? "DisLike " : "Like "} the Tweet successfully !`).send(res);
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
  new ApiResponse(200, {}, `${hasLiked ? "DisLike" : "Like "} the Comment successfully !`).send(
    res,
  );
});

export { togglePostLike, toggleCommentLike, toggleTweetLike, toggleReelLike };
