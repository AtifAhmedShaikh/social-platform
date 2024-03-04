import mongoose from "mongoose";
import app from "../app.js";

function calculateFollowerCountPipelines() {
  const userId = app.locals.user?._id; // get loggedIn user Id app variables
  const followersCountStage = {
    $lookup: {
      from: "follows",
      foreignField: "user",
      localField: "_id",
      as: "followers",
    },
  };
  const addFieldsStage = {
    $addFields: {
      followerCount: {
        $size: "$followers",
      },
      isFollowing: {
        $in: [new mongoose.Types.ObjectId(userId), "$followers.follower"],
      },
    },
  };
  return [followersCountStage, addFieldsStage]; // return the pipelines array
}

function calculateFollowingCountPipelines(next) {
  const followingCountStage = {
    $lookup: {
      from: "follows",
      foreignField: "follower",
      localField: "_id",
      as: "following",
    },
  };
  const addFieldsStage = {
    $addFields: {
      followingCount: {
        $size: "$following",
      },
    },
  };
  return [followingCountStage, addFieldsStage]; // return the pipelines array
  next();
}

export { calculateFollowerCountPipelines, calculateFollowingCountPipelines };
