import mongoose from "mongoose";
import TweetModel from "../models/Tweet.model.js";
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
 * A service class for performing operations related to tweets, including
 * fetching, creating, updating, and deleting tweets in the database.
 */
class TweetServices {
  /**
   * Retrieves all tweets from the database using aggregation
   * @return {Promise<Array<Object>>} An array of tweet documents
   */
  static async findTweets() {
    return await TweetModel.aggregate([
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("tweet"),
      ...calculateCommentsCountPipelines("tweet"),
    ]);
  }

  /**
   * Retrieves a specific tweet by its ID from the database using aggregation.
   * @param {string} tweetId - The ID of the tweet to be retrieved.
   * @return {Promise<Object|null>} The tweet document matching the provided ID,
   * or null if no matching tweet is found.
   */
  static async findTweetById(tweetId) {
    const tweets = await TweetModel.aggregate([
      // stage to match tweet by id
      { $match: { _id: new mongoose.Types.ObjectId(tweetId) } },
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("tweet"),
      ...calculateCommentsCountPipelines("tweet"),
    ]);
    return tweets[0]; // return only first document
  }

  /**
   * Creates a new tweet document in the database based on the provided data
   * @param {Object} tweetData - The data for creating a new tweet
   * @return {Promise<Object>} The newly created tweet document
   */
  static async createTweet(tweetData) {
    return await TweetModel.create({
      owner: tweetData.owner,
      content: tweetData.content,
      isPublic: tweetData.isPublic,
      allowComments: tweetData.allowComments,
      allowSaving: tweetData.allowSaving,
    });
  }
  /**
   * Updates a specific tweet by its ID with the provided content.
   * @param {string} tweetId - The ID of the tweet to be updated.
   * @param {Object} updateData - The data to update the tweet with.
   * @param {string} updateData.content - The new content of the tweet.
   * @return {Promise<Object|null>} The updated tweet document,
   * or null if no matching tweet is found.
   */
  static async updateTweetById(tweetId, updateData) {
    return await TweetModel.findByIdAndUpdate(tweetId, { $set: { ...updateData } }, { new: true });
  }
  /**
   * Deletes a specific tweet by its ID, along with its associated likes and comments.
   * @param {string} tweetId - The ID of the tweet to be deleted.
   * @return {Promise<Object|null>} The deleted tweet document,
   * or null if no matching tweet is found.
   */
  static async deleteTweetById(tweetId) {
    const deletedTweet = await TweetModel.findByIdAndDelete(tweetId);
    await LikeModel.deleteMany({ tweet: tweetId });
    await CommentModel.deleteMany({ tweet: tweetId });
    return deletedTweet;
  }
  static async findTweetComments(tweetId) {
    const comments = await CommentModel.aggregate([
      // match stage to retrieve comments of provided post by post ID
      { $match: { tweet: new mongoose.Types.ObjectId(tweetId) } },
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("comment"),
    ]);
    return comments;
  }
  static async findTweetLikedUsers(tweetId) {
    const likes = await LikeModel.aggregate([
      // match stage to retrieve likes of provided tweet by tweet ID
      { $match: { tweet: new mongoose.Types.ObjectId(tweetId) } },
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

export default TweetServices;
