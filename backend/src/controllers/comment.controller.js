import asyncHandler from "../utils/asyncHandler.js";
import CommentModel from "../models/Comment.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { findPostById, findPostComments } from "../services/post.service.js";
import { findReelById, findReelComments } from "../services/reel.service.js";
import { findTweetById, findTweetComments } from "../services/tweet.service.js";

const addCommentOnPost = asyncHandler(async (req, res) => {
  const postId = req.params?.id;
  const userId = req.user?._id;
  const targetedPostToAddComment = await findPostById(postId, userId);
  if (!targetedPostToAddComment) {
    throw new ApiError(404, "post not found, Invalid post Id ");
  }
  // Ensure post has allow to add comments
  if (!targetedPostToAddComment?.configuration?.allowComments) {
    throw new ApiResponse(401, {}, "post does not allow comments");
  }
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
  res.status(201).json(responseInstance);
});

const addCommentOnReel = asyncHandler(async (req, res) => {
  const reelId = req.params?.id;
  const userId = req.user?._id;
  const targetedReelToAddComment = await findReelById(reelId, userId);
  if (!targetedReelToAddComment) {
    throw new ApiError(404, "reel not found, Invalid reel Id ");
  }
  // Ensure reel has allow to add comments
  if (!targetedReelToAddComment?.configuration?.allowComments) {
    throw new ApiResponse(401, {}, "reel does not allow comments");
  }
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
  res.status(201).json(responseInstance);
});

const addCommentOnTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params?.id;
  const userId = req.user?._id;
  const targetedTweetToAddComment = await findTweetById(tweetId, userId);
  if (!targetedTweetToAddComment) {
    throw new ApiError(404, "tweet not found, Invalid tweet Id ");
  }
  // Ensure post has allow to add comments
  if (!targetedTweetToAddComment?.configuration?.allowComments) {
    throw new ApiResponse(401, {}, "tweet does not allow comments");
  }
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
  res.status(201).json(responseInstance);
});

// get comment Id from params and update its content by provided content
const updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params?.id;
  const { content } = req.body;
  const updatedComment = await CommentModel.findByIdAndUpdate(
    commentId,
    { $set: { content } },
    { new: true },
  );
  if (!updatedComment) {
    throw new ApiError(500, "some thing went wrong while updating comment");
  }
  const responseInstance = new ApiResponse(
    200,
    { comment: updatedComment },
    "comment updated successfully on post!",
  );
  res.status(200).json(responseInstance);
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const deletedComment = await CommentModel.findByIdAndDelete(commentId);
  const responseInstance = new ApiResponse(
    200,
    { deletedComment },
    "comment has deleted successfully !",
  );
  res.status(200).json(responseInstance);
});

const getPostComments = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const targetedPostToGetComments = await findPostById(postId, userId);
  if (!targetedPostToGetComments) {
    throw new ApiError(404, "post not found, Invalid post Id ");
  }
  const postComments = await findPostComments(postId, userId);
  if (!postComments?.length) {
    throw new ApiError(404, "post comments does not exists ");
  }
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
  const targetedReelToGetComments = await findReelById(reelId, userId);
  if (!targetedReelToGetComments) {
    throw new ApiError(404, "reel not found, Invalid reel Id ");
  }
  const reelComments = await findReelComments(reelId, userId);
  if (!reelComments?.length) {
    throw new ApiError(404, "reel comments does not exists ");
  }
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
  const targetedTweetToGetComments = await findTweetById(tweetId, userId);
  if (!targetedTweetToGetComments) {
    throw new ApiError(404, "tweet not found, Invalid tweet Id ");
  }
  const tweetComments = await findTweetComments(tweetId, userId);
  if (!tweetComments?.length) {
    throw new ApiError(404, "tweet comments does not exists ");
  }
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
