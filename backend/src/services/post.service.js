import mongoose from "mongoose";
import PostModel from "../models/Post.model.js";
import LikeModel from "../models/Like.model.js";
import CommentModel from "../models/Comment.model.js";
import { joinOwnerDetailsPipelines } from "../pipelines/joinOwnerDetailsPipelines.js";
import { calculateLikesCountPipelines } from "../pipelines/calculateLikesCountPipelines.js";
import { calculateCommentsCountPipelines } from "../pipelines/calculateCommentsCountPipelines.js";
import {
  calculateFollowerCountPipelines,
  calculateFollowingCountPipelines,
} from "../pipelines/followCountPipelines.js";

/**
 * services for post
 */
class PostServices {
  // method to retrieve all posts from database using aggregation pipelines
  async findPosts() {
    const posts = await PostModel.aggregate([
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("post"),
      ...calculateCommentsCountPipelines("post"),
    ]);
    return posts;
  }

  // method to fetch one specific post by ID from database using aggregation
  async findPostById(postId) {
    const posts = await PostModel.aggregate([
      { $match: { _id: postId } },
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("post"),
      ...calculateCommentsCountPipelines("post"),
    ]);
    return posts[0]; // return only first document
  }

  // method to create a new post document in database by provided data
  async createPost(postData) {
    return await PostModel.create({ ...postData });
  }

  // method to update the post document by provided data
  async updatePost(postId, updateData) {
    return await PostModel.findByIdAndUpdate(postId, { $set: { ...updateData } }, { new: true });
  }

  // method to delete the post and its corresponding likes and comments documents
  async deletePostById(postId) {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    await LikeModel.deleteMany({ post: postId });
    await CommentModel.deleteMany({ post: postId });
    return deletedPost;
  }
  // retrieve all post comments using aggregation pipeline
  async findPostComments(postId) {
    const comments = await CommentModel.aggregate([
      // match stage to retrieve comments of provided post by post ID
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("comment"),
    ]);
    return comments;
  }
  async findPostLikedUsers(postId) {
    const likes = await LikeModel.aggregate([
      // match stage to retrieve likes of provided post by post ID
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "likedBy",
          as: "likedBy",
          // nested pipelines to get corresponding details of each user
          pipeline: [
            ...calculateFollowerCountPipelines(), // pipelines to get followers count of each user
            ...calculateFollowingCountPipelines(), // pipelines to get following count each user
          ],
        },
      },
      { $addFields: { likedBy: { $first: "$likedBy" } } },
      { $replaceRoot: { newRoot: "$likedBy" } },
    ]);
    return likes;
  }
}

export default new PostServices();
