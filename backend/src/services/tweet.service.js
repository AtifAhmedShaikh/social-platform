import TweetModel from "../models/Tweet.model.js";
import mongoose from "mongoose";
import ContentConfiguration from "../models/ContentConfiguration.model.js";

export const findTweets = async currentUserId => {
  return await TweetModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              name: 1,
              username: 1,
              avatar: 1,
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
    {
      $lookup: {
        from: "contentconfigurations",
        foreignField: "tweetId",
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
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "tweet",
        localField: "_id",
        as: "likeCount",
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "tweet",
        localField: "_id",
        as: "commentCount",
      },
    },
    {
      $addFields: {
        author: { $first: "$author" },
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

// retrieve specific tweet by Id using aggregate pipeline and return first object in array
export const findTweetById = async (tweetId, currentUserId) => {
  const tweets=await TweetModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(tweetId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              name: 1,
              username: 1,
              avatar: 1,
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
    {
      $lookup: {
        from: "contentconfigurations",
        foreignField: "tweetId",
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
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "tweet",
        localField: "_id",
        as: "likeCount",
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "tweet",
        localField: "_id",
        as: "commentCount",
      },
    },
    {
      $addFields: {
        author: { $first: "$author" },
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
  return tweets[0];// return first value from aggregation array
};

export const createUserTweet = async tweetData => {
  const { content, userId, isPublic, allowComments, allowSharing, allowSaving, displayLikeCount } =
    tweetData;
  const createdTweet = await TweetModel.create({
    content,
    author: userId,
  });
  // here create post content configuration document of this post
  const createdTweetConfig = await ContentConfiguration.create({
    tweetId: createdTweet._id, // attach currently created post Id
    isPublic, // post public or private
    allowComments,
    allowSaving,
    allowSharing,
    displayLikeCount,
  });
  return { createdTweet, createdTweetConfig };
};
