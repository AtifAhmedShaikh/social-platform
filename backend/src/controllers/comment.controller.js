import asyncHandler from "../utils/asyncHandler.js";
import CommentModel from "../models/Comment.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { findPostComments } from "../services/post.service.js";
import { findReelComments } from "../services/reel.service.js";
import { findTweetComments } from "../services/tweet.service.js";

const addCommentOnPost = asyncHandler(async (req, res) => {
  const postId = req.params?.id;
  const userId = req.user?._id;
  const { content } = req.body; // content or message of comment
  const createdComment = await CommentModel.create({
    author: userId,
    post: postId,
    content,
  });
  const responseInstance = new ApiResponse(
    201,
    { comment: createdComment },
    "comment created successfully on post !",
  );
  res.status(200).json(responseInstance);
});
const addCommentOnReel = asyncHandler(async (req, res) => {
  const reelId = req.params?.id;
  const userId = req.user?._id;
  const { content } = req.body;
  const createdComment = await CommentModel.create({
    author: userId,
    reel: reelId,
    content,
  });
  const responseInstance = new ApiResponse(
    201,
    { comment: createdComment },
    "comment created successfully on reel !",
  );
  res.status(200).json(responseInstance);
});
const addCommentOnTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params?.id;
  const userId = req.user?._id;
  const { content } = req.body;
  const createdComment = await CommentModel.create({
    author: userId,
    tweet: tweetId,
    content,
  });
  const responseInstance = new ApiResponse(
    201,
    { comment: createdComment },
    "comment created successfully on tweet !",
  );
  res.status(200).json(responseInstance);
});

// get comment Id from params and update its content by provided content
const updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params?.id;
  const { content } = req.body;
  const updatedComment = await CommentModel.findByIdAndUpdate(
    commentId,
    { content },
    { new: true },
  );
  const responseInstance = new ApiResponse(
    200,
    { comment: updatedComment },
    "comment updated successfully on post!",
  );
  res.status(200).json(responseInstance);
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  await CommentModel.findByIdAndDelete(commentId);
  const responseInstance = new ApiResponse(200, {}, "comment has deleted successfully !");
  res.status(200).json(responseInstance);
});

const getPostComments = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const postComments = await findPostComments(postId, userId);
  const responseInstance = new ApiResponse(
    200,
    { comments: postComments },
    "comments fetched successfully",
  );
  res.status(200).json(responseInstance);
});

const getReelComments = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const userId = req.user?._id;
  const reelComments = await findReelComments(reelId, userId);
  const responseInstance = new ApiResponse(
    200,
    { comments: reelComments },
    "comments fetched successfully",
  );
  res.status(200).json(responseInstance);
});
const getTweetComments = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user?._id;
  const tweetComments = await findTweetComments(tweetId, userId);
  const responseInstance = new ApiResponse(
    200,
    { comments: tweetComments },
    "comments fetched successfully",
  );
  res.status(200).json(responseInstance);
});

export {
  // Add Comment
  addCommentOnPost,
  addCommentOnReel,
  addCommentOnTweet,
  // Get comments
  getPostComments,
  getReelComments,
  getTweetComments,
  // Update and delete comments
  updateComment,
  deleteComment,
};
