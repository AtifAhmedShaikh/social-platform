import ReelServices from "../services/reel.service.js";
import TweetServices from "../services/tweet.service.js";
import ApiError from "../utils/ApiError.js";
import CommentModel from "../models/Comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import PostServices from "../services/post.service.js";

const isAuthorizedToPostModification = asyncHandler(async (req, _, next) => {
  const postId = req.params.id;
  const userId = req.user?._id; // get loggedIn user Id
  const targetedPostToModify = await PostServices.findPostById(postId);
  // convert ObjectId into string and Ensure post owner is current user before delete or update
  if (String(targetedPostToModify?.owner?._id) !== String(userId)) {
    throw new ApiError(401, "you are not authorized for the Post Modification ");
  }
  next(); // pass control to next handler for modification
});

const isAuthorizedToReelModification = asyncHandler(async (req, _, next) => {
  const reelId = req.params.id;
  const userId = req.user?._id; // get loggedIn user Id
  const targetedReelToModify = await ReelServices.findReelById(reelId);
  // convert ObjectId into string and Ensure reel creator is current user before delete or update
  if (String(targetedReelToModify?.owner?._id) !== String(userId)) {
    throw new ApiError(401, "you are not authorized for the Reel Modification  ");
  }
  next(); // pass control to next handler for modification
});

const isAuthorizedToTweetModification = asyncHandler(async (req, _, next) => {
  const tweetId = req.params.id;
  const userId = req.user?._id; // get loggedIn user Id
  const targetedTweetToModify = await TweetServices.findTweetById(tweetId);
  // convert ObjectId into string and Ensure tweet author is current user before delete or update
  if (String(targetedTweetToModify?.owner?._id) !== String(userId)) {
    throw new ApiError(401, "you are not authorized for the Tweet Modification ");
  }
  next(); // pass control to next handler for modification
});

const isAuthorizedToCommentModification = asyncHandler(async (req, _, next) => {
  const commentId = req.params.id;
  const userId = req.user._id; // get loggedIn user Id
  const targetedCommentToModify = await CommentModel.findById(commentId);
  // convert ObjectId into string and Ensure comment author is current user before delete or update
  if (String(targetedCommentToModify?.author) !== String(userId)) {
    throw new ApiError(401, "you are not authorized for the Comment Modification ");
  }
  next(); // pass control to next handler for modification
});

export {
  isAuthorizedToPostModification,
  isAuthorizedToTweetModification,
  isAuthorizedToReelModification,
  isAuthorizedToCommentModification,
};
