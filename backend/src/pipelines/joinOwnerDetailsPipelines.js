import mongoose from "mongoose";
import app from "../app.js";

const joinOwnerDetailsPipelines = () => {
  const userId = app.locals.user?._id; // get loggedIn user Id from app variables
  const stage1 = {
    $lookup: {
      from: "users",
      foreignField: "_id",
      localField: "owner",
      as: "owner",
    },
  };
  const stage2 = {
    $lookup: {
      from: "follows",
      foreignField: "follower",
      localField: "owner._id",
      as: "followers",
    },
  };
  const stage3 = {
    $addFields: {
      owner: { $first: "$owner" },
      isFollowing: {
        $in: [new mongoose.Types.ObjectId(userId), "$followers.user"],
      },
      isUploadedByCurrentUser: {
        $eq: [{ $arrayElemAt: ["$owner._id", 0] }, new mongoose.Types.ObjectId(userId)],
      },
    },
  };
  return [stage1, stage2, stage3];
};

export { joinOwnerDetailsPipelines };
