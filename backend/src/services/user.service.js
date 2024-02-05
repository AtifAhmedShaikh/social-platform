import UserModel from "../models/User.model.js";
import {
  stageToApplyProjectionInDocument,
  stageToAttachFieldsInUserDocument,
  stageToGetContentConfig,
  stageToGetCreator,
  stageToGetComments,
  stageToGetLikes,
  stageToGetUserFollowers,
  stageToGetUserFollowing,
  stageToMatchDocumentById,
  stageToAttachFieldsInDocuments,
} from "../aggregations/fetchContentStages.js";

export const createUser = async userData => {
  const user = new UserModel({
    ...userData,
  });
  return await user.save();
};

export const findUserByUsernameOrEmail = async (username, email) => {
  return await UserModel.findOne({ $or: [{ username }, { email }] }).select("+password");
};

export const findUserAndUpdate = async (condition, updatedDetails) => {
  return await UserModel.findOneAndUpdate(condition, updatedDetails, { new: true });
};

export const findUserById = async (userId, loggedInUserID) => {
  const users = await UserModel.aggregate([
    stageToMatchDocumentById("_id", userId),
    stageToGetUserFollowers(),
    stageToGetUserFollowing(),
    stageToAttachFieldsInUserDocument(loggedInUserID),
    stageToApplyProjectionInDocument(
      "name:1,username:1,avatar:1,followerCount:1,followingCount:1,isFollowing:1",
    ),
  ]);
  return users[0];
};

export const findUsers = async loggedInUserID => {
  return UserModel.aggregate([
    stageToGetUserFollowers(),
    stageToGetUserFollowing(),
    stageToAttachFieldsInUserDocument(loggedInUserID),
    stageToApplyProjectionInDocument(
      "name:1,username:1,avatar:1,followerCount:1,followingCount:1,isFollowing:1",
    ),
  ]);
};

export const findUserProfileByUsername = async (username, loggedInUserID) => {
  const profiles = await UserModel.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    stageToGetUserFollowers(),
    stageToGetUserFollowing(),
    // fetch all tweets of this user
    {
      $lookup: {
        from: "tweets",
        foreignField: "author",
        localField: "_id",
        as: "tweets",
        pipeline: [
          stageToGetCreator("author", loggedInUserID),
          stageToGetContentConfig("tweetId"),
          stageToGetLikes("tweet"),
          stageToGetComments("tweet"),
          stageToAttachFieldsInDocuments("author", loggedInUserID),
          stageToApplyProjectionInDocument("__v:0,updatedAt:0"),
        ],
      },
    },
    // fetch all posts of this user
    {
      $lookup: {
        from: "posts",
        foreignField: "creator",
        localField: "_id",
        as: "posts",
        pipeline: [
          stageToGetCreator("creator", loggedInUserID),
          stageToGetContentConfig("postId"),
          stageToGetLikes("post"),
          stageToGetComments("post"),
          stageToAttachFieldsInDocuments("creator", loggedInUserID),
          stageToApplyProjectionInDocument("__v:0,updatedAt:0"),
        ],
      },
    },
    // fetch all reels of this user
    {
      $lookup: {
        from: "reels",
        foreignField: "creator",
        localField: "_id",
        as: "reels",
        pipeline: [
          stageToGetCreator("creator", loggedInUserID),
          stageToGetContentConfig("reelId"),
          stageToGetLikes("reel"),
          stageToGetComments("reel"),
          stageToAttachFieldsInDocuments("creator", loggedInUserID),
          stageToApplyProjectionInDocument("__v:0,updatedAt:0"),
        ],
      },
    },
    stageToAttachFieldsInUserDocument(loggedInUserID),
    stageToApplyProjectionInDocument("__v:0,following:0,followers:0,password:0,updatedAt:0"),
  ]);
  return profiles[0];
};
