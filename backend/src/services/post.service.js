import PostModel from "../models/Post.model.js";
import CommentModel from "../models/Comment.model.js";
import * as AggregationPipelines from "../utils/stages.js";

// Retrieve all posts with complete information using aggregation pipelines methods
export const findPosts = async () => {
  return await PostModel.aggregate([
    // Stage 1: Join creator details
    AggregationPipelines.joinCreatorDetails("creator"),
    // Stage 2: Get post config document
    AggregationPipelines.createLookup("contentconfigs", "_id", "postId", "postConfig", [
      // nested pipeline to remove unwanted fields from config document
      AggregationPipelines.generateProjection("__v:0,updatedAt:0,_id:0,postId:0"),
    ]),
    // Stage 3: Get post likes documents
    AggregationPipelines.createLookup("likes", "_id", "post", "likeCount"),
    // Stage 4: Get comments documents
    AggregationPipelines.createLookup("comments", "_id", "post", "commentCount"),
    // Stage 5: Attach new fields in post document
    AggregationPipelines.attachFieldsInDocument(
      "$first:owner,$first:postConfig,$size:likeCount,$size:commentCount",
      "isLiked",
    ),
    // Stage 6: Generate projection stage to remove unwanted fields
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,creator:0"),
  ]);
};

// retrieve one specific post by ID with complete Information using Aggregation pipelines methods
export const findPostById = async (postId, loggedInUserID) => {
  const posts = await PostModel.aggregate([
    // stage:1 match document by ID
    AggregationPipelines.matchDocumentById("_id", postId),
    AggregationPipelines.joinCreatorDetails("creator"),
    // stage:2 get post config document
    AggregationPipelines.createLookup("contentconfigs", "_id", "postId", "postConfig", [
      AggregationPipelines.generateProjection("__v:0,updatedAt:0,_id:0,postId:0"), // remove unwanted fields from post config document
    ]),
    // stage:3 get all post like documents
    AggregationPipelines.createLookup("likes", "_id", "post", "likeCount"),
    // stage:4 get all comments documents
    AggregationPipelines.createLookup("comments", "_id", "post", "commentCount"),
    // stage:5 to attach new fields in post document
    AggregationPipelines.attachFieldsInDocument(
      "$first:owner,$first:postConfig,$size:likeCount,$size:commentCount",
      "isLiked",
    ),
    // stage:6 generate projection stage to remove unwanted fields
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,creator:0"),
  ]);
  return posts[0];
};

export const findPostComments = async (postId, currentUserId) => {
  return await CommentModel.aggregate([
    // stage:1 get all comments for this post
    AggregationPipelines.matchDocumentById("post", postId),
    // stage:2 join comment author details
    AggregationPipelines.joinCreatorDetails("author"),
    // stage:3 get all comments like documents
    AggregationPipelines.createLookup("likes", "_id", "post", "likeCount"),
    AggregationPipelines.attachFieldsInDocument("$first:owner,$size:likeCount", "isLiked"),
    AggregationPipelines.generateProjection("__v:0,updatedAt:0,author:0"),
  ]);
};
