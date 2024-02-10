import TweetModel from "../models/Tweet.model.js";
import CommentModel from "../models/Comment.model.js";
import * as AggregationPipelines from "../utils/stages.js";

export const findTweets = async () => {
  return await TweetModel.aggregate([
    // Stage 1: Join creator details
    AggregationPipelines.joinCreatorDetails("author"),
    // Stage 2: Get post config document
    AggregationPipelines.createLookup("likes", "_id", "post", "likeCount"),
    // Stage 5: Attach new fields in post document
    AggregationPipelines.attachFieldsInDocument("$first:owner,$size:likeCount", "isLiked"),
    // Stage 6: Generate projection stage to remove unwanted fields
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,creator:0"),
  ]);
};

// retrieve specific tweet by Id using aggregate pipeline and return first object in array
export const findTweetById = async tweetId => {
  const tweets = await TweetModel.aggregate([
    // Stage 1: match tweet by provided Id
    AggregationPipelines.matchDocumentById("_id", tweetId),
    // Stage 1: Join creator details
    AggregationPipelines.joinCreatorDetails("author"),
    // Stage 2: Get post config document
    AggregationPipelines.createLookup("likes", "_id", "post", "likeCount"),
    // Stage 5: Attach new fields in post document
    AggregationPipelines.attachFieldsInDocument("$first:owner,$size:likeCount", "isLiked"),
    // Stage 6: Generate projection stage to remove unwanted fields
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,creator:0"),
  ]);
  return tweets[0]; // return first value from aggregation array
};

// retrieve specific Tweet comments by Id using aggregate pipeline
export const findTweetComments = async tweetId => {
  return await CommentModel.aggregate([
    // stage:1 get all comments for this reel
    AggregationPipelines.matchDocumentById("reel", tweetId),
    // stage:2 join comment author details
    AggregationPipelines.joinCreatorDetails("author"),
    // stage:3 get all comments like documents
    AggregationPipelines.createLookup("likes", "_id", "reel", "likeCount"),
    AggregationPipelines.attachFieldsInDocument("$first:owner,$size:likeCount", "isLiked"),
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,author:0"),
  ]);
};
