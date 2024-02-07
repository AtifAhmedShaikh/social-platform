import asyncHandler from "../utils/asyncHandler.js";
import { findPostById } from "../services/post.service.js";
import { findReelById } from "../services/reel.service.js";
import { findTweetById } from "../services/tweet.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import GalleryModel from "../models/UserGallery.model.js";
import {
  addToGallery,
  findUserGallery,
  removeFromGallery,
} from "../services/userGallery.service.js";

const getUserGallery = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const gallery = await findUserGallery(userId);
  const responseInstance = new ApiResponse(200, { gallery }, "Gallery fetched successfully !");
  res.status(200).json(responseInstance);
});

// controller to add or remove provided post in User Gallery
const togglePostInUserGallery = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const targetedPost = await findPostById(postId); // targeted post to add or remove from gallery
  if (!targetedPost) {
    throw new ApiError(404, "post not found, Invalid post Id");
  }
  // Ensure the post has allow to save
  if (!targetedPost?.configuration?.allowSaving) {
    throw new ApiError(401, "post does not allow to save");
  }
  const isAlreadyInGallery = await GalleryModel.findOne({
    user: userId,
    posts: { $in: [targetedPost._id] },
  });
  // If post has already in Gallery so remove it otherwise add this post in User Gallery
  if (isAlreadyInGallery) {
    // remove post from user gallery
    await removeFromGallery("posts", targetedPost._id, userId);
    const responseInstance = new ApiResponse(200, {}, "remove post from user Gallery ");
    return res.status(200).json(responseInstance);
  }
  // add post in user gallery
  await addToGallery("posts", targetedPost._id, userId);
  const responseInstance = new ApiResponse(200, {}, "add post in user Gallery ");
  return res.status(200).json(responseInstance);
});

// controller to add provided reel in logged User Gallery
const toggleReelInUserGallery = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const userId = req.user?._id;
  const targetedReel = await findReelById(reelId); // targeted reel to add or remove from gallery
  if (!targetedReel) {
    throw new ApiError(404, "reel not found, Invalid reel Id");
  }
  // Ensure the reel has allow to save
  if (!targetedReel?.configuration?.allowSaving) {
    throw new ApiError(401, "reel does not allow to save");
  }
  const isAlreadyInGallery = await GalleryModel.findOne({
    user: userId,
    reels: { $in: [targetedReel._id] },
  });
  // If reel has already in Gallery so remove it otherwise add this reel in User Gallery
  if (isAlreadyInGallery) {
    // remove reel from user gallery
    await removeFromGallery("reels", targetedReel._id, userId);
    const responseInstance = new ApiResponse(200, {}, "remove reel from user Gallery ");
    return res.status(200).json(responseInstance);
  }
  // add reel in user gallery
  await addToGallery("reels", targetedReel._id, userId);
  const responseInstance = new ApiResponse(200, {}, "add reel in user Gallery ");
  return res.status(200).json(responseInstance);
});

// controller to add provided tweet in logged User Gallery
const toggleTweetInUserGallery = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user?._id;
  const targetedTweet = await findTweetById(tweetId); // targeted tweet to add or remove from gallery
  if (!targetedTweet) {
    throw new ApiError(404, "tweet not found, Invalid tweet Id");
  }
  // Ensure the tweet has allow to save
  if (!targetedTweet?.configuration?.allowSaving) {
    throw new ApiError(401, "tweet does not allow to save");
  }
  const isAlreadyInGallery = await GalleryModel.findOne({
    user: userId,
    tweets: { $in: [targetedTweet._id] },
  });
  // If tweet has already in Gallery so remove it otherwise add this tweet in User Gallery
  if (isAlreadyInGallery) {
    // remove tweet from user gallery
    await removeFromGallery("tweets", targetedTweet._id, userId);
    const responseInstance = new ApiResponse(200, {}, "remove tweet from user Gallery ");
    return res.status(200).json(responseInstance);
  }
  // add tweet in user gallery
  await addToGallery("tweets", targetedTweet._id, userId);
  const responseInstance = new ApiResponse(200, {}, "add tweet in user Gallery");
  return res.status(200).json(responseInstance);
});

export {
  togglePostInUserGallery,
  toggleReelInUserGallery,
  toggleTweetInUserGallery,
  getUserGallery,
};
