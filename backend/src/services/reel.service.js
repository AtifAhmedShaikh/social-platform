import ReelModel from "../models/Reel.model.js";
import ContentConfiguration from "../models/ContentConfiguration.model.js";
import mongoose from "mongoose";

// lookup to retrieve post configurations
const lookupToPostConfiguration = {
  $lookup: {
    from: "contentconfigurations",
    foreignField: "reelId",
    localField: "_id",
    as: "configuration",
    pipeline: [
      {
        $project: {
          isPublic: 1,
          allowComments: 1,
          allowSharing: 1,
          allowSaving: 1,
          _id: 0,
        },
      },
    ],
  },
};

// lookup to get post creator of post

const lookupToGetLikeCount = {
  $lookup: {
    from: "likes",
    foreignField: "reel",
    localField: "_id",
    as: "likeCount",
  },
};

const lookupToGetCommentCount = {
  $lookup: {
    from: "comments",
    foreignField: "reel",
    localField: "_id",
    as: "commentCount",
  },
};

export const createUserReel = async reelData => {
  const {
    reelVideoFile,
    userId,
    caption,
    isPublic,
    allowComments,
    allowSharing,
    allowSaving,
    displayLikeCount,
  } = reelData;
  const createdReel = await ReelModel.create({
    creator: userId,
    caption,
    reelVideoFile,
  });
  const createdReelConfig = await ContentConfiguration.create({
    reelId: createdReel._id, // attach currently created post Id
    isPublic, // post public or private
    allowComments,
    allowSaving,
    allowSharing,
    displayLikeCount,
  });
  return { createdReel, createdReelConfig };
};

export const findReelById = async (reelId, currentUserId) => {
  const reels = await ReelModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(reelId),
      },
    },
    lookupToPostConfiguration,
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creator",
        pipeline: [
          {
            $project: {
              name: 1,
              username: 1,
              avatar: 1,
              _id: 1,
            },
          },
          {
            $addFields: {
              isUploadedByMe: {
                $cond: {
                  if: { $eq: ["$_id", new mongoose.Types.ObjectId(currentUserId)] },
                  then: true,
                  else: false,
                },
              },
            },
          },
        ],
      },
    },
    lookupToGetLikeCount,
    lookupToGetCommentCount,
    {
      $addFields: {
        creator: { $first: "$creator" },
        configuration: {
          $first: "$configuration",
        },
        likeCount: {
          $size: "$likeCount",
        },
        commentCount: {
          $size: "$commentCount",
        },
        isLiked: {
          $cond: {
            if: {
              $in: [new mongoose.Types.ObjectId(currentUserId), "$likeCount.likedBy"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        __v: 0,
        updatedAt: 0,
      },
    },
  ]);
  return reels[0];
};

export const findReels = async currentUserId => {
  return await ReelModel.aggregate([
    lookupToPostConfiguration,
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creator",
        pipeline: [
          {
            $project: {
              name: 1,
              username: 1,
              avatar: 1,
              _id: 1,
            },
          },
          {
            $addFields: {
              isUploadedByMe: {
                $cond: {
                  if: { $eq: ["$_id", new mongoose.Types.ObjectId(currentUserId)] },
                  then: true,
                  else: false,
                },
              },
            },
          },
        ],
      },
    },
    lookupToGetLikeCount,
    lookupToGetCommentCount,
    {
      $addFields: {
        creator: { $first: "$creator" },
        configuration: {
          $first: "$configuration",
        },
        likeCount: {
          $size: "$likeCount",
        },
        commentCount: {
          $size: "$commentCount",
        },
        isLiked: {
          $cond: {
            if: {
              $in: [new mongoose.Types.ObjectId(currentUserId), "$likeCount.likedBy"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        __v: 0,
        updatedAt: 0,
      },
    },
  ]);
};
