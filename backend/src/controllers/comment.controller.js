import asyncHandler from "../utils/asyncHandler.js";
import CommentModel from "../models/Comment.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import ReelServices from "../services/reel.service.js";
import PostServices from "../services/post.service.js";
import TweetServices from "../services/tweet.service.js";
import LikeModel from "../models/Like.model.js";

const addCommentOnPost = asyncHandler(async (req, res) => {
  const postId = req.params?.id; // post ID to add a comment
  const userId = req.user?._id; // loggedIn user ID
  const { content } = req.body; // content or message of comment

  const targetedPostToAddComment = await PostServices.findPostById(postId);
  if (!targetedPostToAddComment) {
    throw new ApiError(404, "Post not found, Invalid post Id ");
  }
  // Ensure post has allow to add comments
  if (!targetedPostToAddComment?.allowComments) {
    throw new ApiError(401, "Post does not allow comments");
  }

  const createdComment = await CommentModel.create({
    owner: userId,
    post: postId,
    content,
  });
  if (!createdComment) {
    throw new ApiError(401, "some thing went wrong while creating  comment");
  }
  new ApiResponse(200, { comment: createdComment }, "Comment added successfully on post !").send(
    res,
  );
});

const addCommentOnReel = asyncHandler(async (req, res) => {
  const reelId = req.params?.id;
  const userId = req.user?._id;
  const { content } = req.body;

  const targetedReelToAddComment = await ReelServices.findReelById(reelId, userId);
  if (!targetedReelToAddComment) {
    throw new ApiError(404, "reel not found, Invalid reel Id ");
  }
  // Ensure reel has allow to add comments
  if (!targetedReelToAddComment?.allowComments) {
    throw new ApiResponse(401, {}, "reel does not allow comments");
  }
  const createdComment = await CommentModel.create({
    owner: userId,
    reel: reelId,
    content,
  });
  new ApiResponse(200, { comment: createdComment }, "Comment added  successfully on reel !").send(
    res,
  );
});

const addCommentOnTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params?.id;
  const userId = req.user?._id;
  const targetedTweetToAddComment = await TweetServices.findTweetById(tweetId);
  if (!targetedTweetToAddComment) {
    throw new ApiError(404, "Tweet not found, Invalid tweet Id ");
  }
  // Ensure post has allow to add comments
  if (!targetedTweetToAddComment?.allowComments) {
    throw new ApiResponse(401, {}, "Tweet does not allow comments");
  }
  const { content } = req.body;
  const createdComment = await CommentModel.create({
    owner: userId,
    tweet: tweetId,
    content,
  });
  new ApiResponse(200, { comment: createdComment }, "Comment added  successfully on tweet!").send(
    res,
  );
});

const getPostComments = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const targetedPostToGetComments = await PostServices.findPostById(postId);
  if (!targetedPostToGetComments) {
    throw new ApiError(404, "Post not found, Invalid post Id ");
  }
  const postComments = await PostServices.findPostComments(postId);
  if (!postComments?.length) {
    throw new ApiError(404, "Post comments does not exists ");
  }
  new ApiResponse(200, { comment: postComments }, "Post Comment fetched successfully !").send(res);
});

const getReelComments = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const targetedReelToGetComments = await ReelServices.findReelById(reelId);
  if (!targetedReelToGetComments) {
    throw new ApiError(404, "reel not found, Invalid reel Id ");
  }
  const reelComments = await ReelServices.findReelComments(reelId);
  if (!reelComments?.length) {
    throw new ApiError(404, "reel comments does not exists ");
  }
  new ApiResponse(200, { comment: reelComments }, "Reel Comment fetched successfully !").send(res);
});

const getTweetComments = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const targetedTweetToGetComments = await TweetServices.findTweetById(tweetId);
  if (!targetedTweetToGetComments) {
    throw new ApiError(404, "Tweet not found, Invalid tweet Id ");
  }
  const tweetComments = await TweetServices.findTweetComments(tweetId);
  if (!tweetComments?.length) {
    throw new ApiError(404, "Tweet comments does not exists ");
  }
  new ApiResponse(200, { comment: tweetComments }, "Tweet Comment fetched successfully !").send(
    res,
  );
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
  new ApiResponse(200, { comment: updatedComment }, "Comment Updated successfully !").send(res);
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const deletedComment = await CommentModel.findByIdAndDelete(commentId);
  await LikeModel.deleteMany({ comment: commentId }); // delete comment corresponding likes
  if (!deletedComment) {
    throw new ApiError(500, "some thing went wrong while deleting comment");
  }
  new ApiResponse(200, {}, "Comment has deleted successfully !").send(res);
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
