import asyncHandler from "../utils/asyncHandler.js";

const addCommentOnPost = asyncHandler(() => {});
const addCommentOnReel = asyncHandler(() => {});
const addCommentOnTweet = asyncHandler(() => {});

const updatePostComment = asyncHandler(() => {});
const updateReelComment = asyncHandler(() => {});
const updateTweetComment = asyncHandler(() => {});

const getPostComments = asyncHandler(() => {});
const getReelComments = asyncHandler(() => {});
const getTweetComments = asyncHandler(() => {});

export {
  // Add Comment
  addCommentOnPost,
  addCommentOnReel,
  addCommentOnTweet,
  // Get comments
  getPostComments,
  getReelComments,
  getTweetComments,
  // Update comments
  updatePostComment,
  updateReelComment,
  updateTweetComment,
};
