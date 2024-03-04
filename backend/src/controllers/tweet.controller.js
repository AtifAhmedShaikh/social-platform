import TweetServices from "../services/tweet.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getTweets = asyncHandler(async (_, res) => {
  const tweets = await TweetServices.findTweets();
  if (!tweets?.length) {
    throw new ApiError(404, "Tweets  does not exists ");
  }
  new ApiResponse(200, { tweets }, "Tweets are fetched successfully !").send(res);
});

// Get one tweet by Id using custom  services method
const getTweetById = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const tweet = await TweetServices.findTweetById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found, Invalid tweet Id ");
  }
  new ApiResponse(200, { tweet }, "Tweet has fetched successfully !").send(res);
});

// create new Tweet document in database using custom method
const createTweet = asyncHandler(async (req, res) => {
  const { content, isPublic, allowComments, allowSaving } = req.body;
  const userId = req.user?._id;
  // create a new tweet document using custom method of services
  const createdTweet = await TweetServices.createTweet({
    content,
    owner: userId,
    isPublic,
    allowComments,
    allowSaving,
  });
  new ApiResponse(201, { tweet: createdTweet }, "Tweet created successfully !").send(res);
});

const updateTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const { content, isPublic, allowComments, allowSaving } = req.body;
  const updatedTweet = await TweetServices.updateTweetById(tweetId, {
    content,
    isPublic,
    allowComments,
    allowSaving,
  });
  new ApiResponse(200, { tweet: updatedTweet }, "Tweet has updated successfully !").send(res);
});

const deleteTweetById = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const deletedTweet = await TweetServices.deleteTweetById(tweetId);
  if (!deletedTweet) {
    throw new ApiError(404, "Some thing went wrong while deleting the tweet ");
  }
  new ApiResponse(200, {}, "Tweet has deleted successfully !").send(res);
});

export { getTweets, getTweetById, createTweet, updateTweet, deleteTweetById };
