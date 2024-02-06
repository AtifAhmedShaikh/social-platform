import { stageToMatchDocumentById } from "../aggregations/fetchContentStages.js";
import GalleryModel from "../models/UserGallery.model.js";
import {
  stageToApplyProjectionInDocument,
  stageToAttachFieldsInDocuments,
  stageToGetComments,
  stageToGetContentConfig,
  stageToGetCreator,
  stageToGetLikes,
  // stageToMatchDocumentById,
} from "../aggregations/fetchContentStages.js";
export const addToGallery = async (field, documentIdToAdd, userId) => {
  // add post,reel,tweet in user gallery
  const updatedGallery = await GalleryModel.findOneAndUpdate(
    { user: userId },
    { $push: { [field]: documentIdToAdd } },
    { new: true },
  );
  return updatedGallery;
};

export const removeFromGallery = async (field, documentIdToAdd, userId) => {
  // remove post,reel,tweet in user gallery
  const updatedGallery = await GalleryModel.findOneAndUpdate(
    { user: userId },
    { $pull: { [field]: documentIdToAdd } },
    { new: true },
  );
  return updatedGallery;
};

export const findUserGallery = userId => {
  return GalleryModel.aggregate([
    stageToMatchDocumentById("user", userId),
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
  ]);
};
