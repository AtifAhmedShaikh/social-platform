import mongoose from "mongoose";
import ReelModel from "../models/Reel.model.js";
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
 * services for reels
 */
class ReelServices {
  // method to retrieve all reels from database using aggregation
  async findReels() {
    return await ReelModel.aggregate([
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("reel"),
      ...calculateCommentsCountPipelines("reel"),
    ]);
  }

  // method to fetch one specific post by ID from database using aggregation
  async findReelById(reelId) {
    const reels = await ReelModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(reelId) } },
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("reel"),
      ...calculateCommentsCountPipelines("reel"),
    ]);
    return reels[0]; // return only first document
  }

  // method to create a new post document in database by provided data
  async createReel(reelData) {
    return await ReelModel.create({ ...reelData });
  }

  // method to update the post document by provided data
  async updateReel(reelId, updateData) {
    return await ReelModel.findByIdAndUpdate(reelId, { $set: { ...updateData } });
  }

  // method to delete the reel and its corresponding likes and comments documents
  async deleteReel(reelId) {
    const deletedReel = await ReelModel.findByIdAndDelete(reelId);
    await LikeModel.deleteMany({ reel: reelId });
    await CommentModel.deleteMany({ reel: reelId });
    return deletedReel;
  }
  // retrieve all reel comments using aggregation pipeline
  async findReelComments(reelId) {
    const comments = await CommentModel.aggregate([
      // match stage to retrieve comments of provided post by reel ID
      { $match: { reel: new mongoose.Types.ObjectId(reelId) } },
      ...joinOwnerDetailsPipelines(),
      ...calculateLikesCountPipelines("comment"),
    ]);
    return comments;
  }
  async findReelLikedUsers(reelId) {
    const likes = await LikeModel.aggregate([
      // match stage to retrieve likes of provided reel by reel ID
      { $match: { reel: new mongoose.Types.ObjectId(reelId) } },
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

export default new ReelServices();
