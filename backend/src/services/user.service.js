import mongoose from "mongoose";
import UserModel from "../models/User.model.js";
import FollowModel from "../models/Follow.model.js";
import { joinOwnerDetailsPipelines } from "../pipelines/joinOwnerDetailsPipelines.js";
import { calculateLikesCountPipelines } from "../pipelines/calculateLikesCountPipelines.js";
import { calculateCommentsCountPipelines } from "../pipelines/calculateCommentsCountPipelines.js";
import {
  calculateFollowerCountPipelines,
  calculateFollowingCountPipelines,
} from "../pipelines/followCountPipelines.js";

/**
 * services for users
 */
class UserServices {
  async createUser(userData) {
    return await UserModel.create({ ...userData });
  }
  async findUserByUsernameOrEmail(username, email) {
    return await UserModel.findOne({ $or: [{ username }, { email }] }).select("+password");
  }

  async findUserAndUpdate(filter, updatedDetails) {
    return await UserModel.findOneAndUpdate(filter, { $set: { ...updatedDetails } }, { new: true });
  }

  // method to retrieve all users from database using aggregation pipelines
  async findUsers() {
    return await UserModel.aggregate([
      ...calculateFollowerCountPipelines(),
      ...calculateFollowingCountPipelines(),
    ]);
  }
  // method to retrieve one specific user by ID from database
  async findUserById(userId) {
    const users = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      ...calculateFollowerCountPipelines(),
      ...calculateFollowingCountPipelines(),
    ]);
    return users[0]; // return only first document
  }

  // retrieve followers list of user
  async findUserFollowersList(userId) {
    const followersList = FollowModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "follower",
          as: "follower",
          // nested pipelines to get corresponding details of each user
          pipeline: [
            ...calculateFollowerCountPipelines(), // pipelines to get followers count of each user
            ...calculateFollowingCountPipelines(), // pipelines to get following count each user
          ],
        },
      },
      { $addFields: { follower: { $first: "$follower" } } },
      { $replaceRoot: { newRoot: "$follower" } },
    ]);
    return followersList;
  }

  // retrieve following list of user
  async findUserFollowingList(userId) {
    const followersList = await FollowModel.aggregate([
      { $match: { follower: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "follower",
          as: "follower",
          // nested pipelines to get corresponding details of each user
          pipeline: [
            ...calculateFollowerCountPipelines(), // pipelines to get followers count of each user
            ...calculateFollowingCountPipelines(), // pipelines to get following count of each
          ],
        },
      },
      { $addFields: { follower: { $first: "$follower" } } },
      { $replaceRoot: { newRoot: "$follower" } },
    ]);
    return followersList;
  }

  async findUserProfileByUsername(username) {
    const profiles = await UserModel.aggregate([
      { $match: { username: username } },
      ...calculateFollowerCountPipelines(), // pipelines to get followers count of user
      ...calculateFollowingCountPipelines(), // pipelines to get following count of user
      {
        // lookup stage to get all posts of this user
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "owner",
          as: "posts",
          // nested pipelines to join corresponding details of each post
          pipeline: [
            ...joinOwnerDetailsPipelines(),
            ...calculateLikesCountPipelines("post"),
            ...calculateCommentsCountPipelines("post"),
          ],
        },
      },
      {
        // lookup to get all tweets of this user
        $lookup: {
          from: "tweets",
          localField: "_id",
          foreignField: "owner",
          as: "tweets",
          // nested pipelines to join corresponding details of each tweet
          pipeline: [
            ...joinOwnerDetailsPipelines(),
            ...calculateLikesCountPipelines("tweet"),
            ...calculateCommentsCountPipelines("tweet"),
          ],
        },
      },
      {
        // lookup to get all reels of this user
        $lookup: {
          from: "reels",
          localField: "_id",
          foreignField: "owner",
          as: "reels",
          // nested pipelines to join corresponding details of each reel
          pipeline: [
            ...joinOwnerDetailsPipelines(),
            ...calculateLikesCountPipelines("reel"),
            ...calculateCommentsCountPipelines("reel"),
          ],
        },
      },
    ]);

    return profiles[0]; // return only first document
  }
}

export default new UserServices();
