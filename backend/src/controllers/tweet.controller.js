import { findTweetById, findTweets } from "../services/tweet.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import TweetModel from "../models/Tweet.model.js";

const getTweets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const tweets = await findTweets(userId);
  if (!tweets?.length) {
    throw new ApiError(404, "tweets  does not exists ");
  }
  const responseInstance = new ApiResponse(200, { tweets }, "tweets are fetched successfully !");
  res.status(200).json(responseInstance);
});

// Get one tweet by Id using aggregation pipeline and aggregation return an array list
const getTweetById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const tweetId = req.params.id;
  const tweet = await findTweetById(tweetId, userId);
  if (!tweet) {
    throw new ApiError(404, "tweet not found, Invalid tweet Id ");
  }
  const responseInstance = new ApiResponse(200, { tweet }, "tweets are fetched successfully !");
  res.status(200).json(responseInstance);
});

// create new Tweet document in database using custom method
const createTweet = asyncHandler(async (req, res) => {
  const { content, ...tweetConfig } = req.body;
  if (!content?.trim()) {
    throw new ApiError(404, "Tweet content are required ");
  }
  const userId = req.user?._id;
  const createdTweet = await TweetModel.createTweet({ content, author: userId, ...tweetConfig });
  const responseInstance = new ApiResponse(
    201,
    { tweet: createdTweet },
    "tweet created successfully!",
  );
  res.status(201).json(responseInstance);
});

const updateTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const { content } = req.body;
  const tweet = await TweetModel.findByIdAndUpdate(tweetId, { $set: { content } }, { new: true });
  const responseInstance = new ApiResponse(200, { tweet }, "tweet updated successfully!");
  res.status(200).json(responseInstance);
});

const deleteTweetById = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  await TweetModel.findByIdAndDelete(tweetId);
  const responseInstance = new ApiResponse(200, {}, "tweet deleted successfully!");
  res.status(200).json(responseInstance);
});

export { getTweets, getTweetById, createTweet, updateTweet, deleteTweetById };
