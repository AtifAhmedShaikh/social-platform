import ReelModel from "../models/Reel.model.js";
import CommentModel from "../models/Comment.model.js";
import * as AggregationPipelines from "../utils/stages.js";

export const findReelById = async reelId => {
  const reels = await ReelModel.aggregate([
    // Stage 1: match reel by provided Id
    AggregationPipelines.matchDocumentById("_id", reelId),
    // Stage 2: Join creator details
    AggregationPipelines.joinCreatorDetails("creator"),
    // Stage 3: Get reel config document
    AggregationPipelines.createLookup("contentconfigs", "_id", "reelId", "reelConfig", [
      // nested pipeline to remove unwanted fields from config document
      AggregationPipelines.generateProjection("__v:0,updatedAt:0,_id:0,reelId:0"),
    ]),
    // Stage 4: Get reel likes documents
    AggregationPipelines.createLookup("likes", "_id", "reel", "likeCount"),
    // Stage 5: Get comments documents
    AggregationPipelines.createLookup("comments", "_id", "reel", "commentCount"),
    // Stage 6: Attach new fields in reel document
    AggregationPipelines.attachFieldsInDocument(
      "$first:owner,$first:reelConfig,$size:likeCount,$size:commentCount",
      "isLiked",
    ),
    // Stage 7: Generate projection stage to remove unwanted fields
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,creator:0"),
  ]);
  return reels[0];
};

export const findReels = async () => {
  return await ReelModel.aggregate([
    // Stage 1: Join creator details
    AggregationPipelines.joinCreatorDetails("creator"),
    // Stage 2: Get reel config document
    AggregationPipelines.createLookup("contentconfigs", "_id", "reelId", "reelConfig", [
      // nested pipeline to remove unwanted fields from config document
      AggregationPipelines.generateProjection("__v:0,updatedAt:0,_id:0,reelId:0"),
    ]),
    // Stage 3: Get reel likes documents
    AggregationPipelines.createLookup("likes", "_id", "reel", "likeCount"),
    // Stage 4: Get comments documents
    AggregationPipelines.createLookup("comments", "_id", "reel", "commentCount"),
    // Stage 5: Attach new fields in reel document
    AggregationPipelines.attachFieldsInDocument(
      "$first:owner,$first:reelConfig,$size:likeCount,$size:commentCount",
      "isLiked",
    ),
    // Stage 6: Generate projection stage to remove unwanted fields
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,creator:0"),
  ]);
};

export const findReelComments = async reelId => {
  return await CommentModel.aggregate([
    // stage:1 get all comments for this reel
    AggregationPipelines.matchDocumentById("reel", reelId),
    // stage:2 join comment author details
    AggregationPipelines.joinCreatorDetails("author"),
    // stage:3 get all comments like documents
    AggregationPipelines.createLookup("likes", "_id", "reel", "likeCount"),
    AggregationPipelines.attachFieldsInDocument("$first:owner,$size:likeCount", "isLiked"),
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,author:0"),
  ]);
};
