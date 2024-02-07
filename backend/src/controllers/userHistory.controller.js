import UserHistory from "../models/UserHistory.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  stageToApplyProjectionInDocument,
  stageToAttachFieldsInDocuments,
  stageToGetComments,
  stageToGetContentConfig,
  stageToGetCreator,
  stageToGetLikes,
  stageToMatchDocumentById,
} from "../aggregations/fetchContentStages.js";

// controller to get user history which contains user liked posts,reels,and tweets and user watch history of reels
const getUserHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id; // get loggedIn user ID
  const history = await UserHistory.aggregate([
    stageToMatchDocumentById("owner", userId),
    {
      $lookup: {
        from: "posts",
        localField: "posts",
        foreignField: "_id",
        as: "posts",
        pipeline: [
          stageToGetCreator("creator", userId),
          stageToGetContentConfig("postId"),
          stageToGetLikes("post"),
          stageToGetComments("post"),
          stageToAttachFieldsInDocuments("creator", userId),
          stageToApplyProjectionInDocument("__v:0,updatedAt:0"),
        ],
      },
    },
    {
      $lookup: {
        from: "reels",
        localField: "reels",
        foreignField: "_id",
        as: "reels",
        pipeline: [
          stageToGetCreator("creator", userId),
          stageToGetContentConfig("reelId"),
          stageToGetLikes("reel"),
          stageToGetComments("reel"),
          stageToAttachFieldsInDocuments("creator", userId),
          stageToApplyProjectionInDocument("__v:0,updatedAt:0"),
        ],
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "tweets",
        foreignField: "_id",
        as: "tweets",
        pipeline: [
          stageToGetCreator("author", userId),
          stageToGetContentConfig("tweetId"),
          stageToGetLikes("tweet"),
          stageToGetComments("tweet"),
          stageToAttachFieldsInDocuments("author", userId),
          stageToApplyProjectionInDocument("__v:0,updatedAt:0"),
        ],
      },
    },
    // get reels watch history
    {
      $lookup: {
        from: "reels",
        localField: "reelsWatchHistory",
        foreignField: "_id",
        as: "reelsWatchHistory",
        pipeline: [
          stageToGetCreator("creator", userId),
          stageToGetContentConfig("reelId"),
          stageToGetLikes("reel"),
          stageToGetComments("reel"),
          stageToAttachFieldsInDocuments("creator", userId),
          stageToApplyProjectionInDocument("__v:0,updatedAt:0"),
        ],
      },
    },
  ]);
  const responseInstance = new ApiResponse(
    200,
    { history: history[0] },
    "History fetched successfully !",
  );
  res.status(200).json(responseInstance);
});

export { getUserHistory };
