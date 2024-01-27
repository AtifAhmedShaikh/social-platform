import mongoose from "mongoose";
import ContentConfiguration from "../models/ContentConfiguration.model.js";
import PostModel from "../models/Post.model.js";

// Define aggregation pipeline operations in separate objects to reuse it

// lookup to retrieve post configurations
const lookupToPostConfiguration = {
  $lookup: {
    from: "contentconfigurations",
    foreignField: "postId",
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
    foreignField: "post",
    localField: "_id",
    as: "likeCount",
  },
};

const lookupToGetCommentCount = {
  $lookup: {
    from: "comments",
    foreignField: "post",
    localField: "_id",
    as: "commentCount",
  },
};

// retrieve all posts from database with creator and config Info using Aggregation pipelines
export const findPosts = async currentUserId => {
  return await PostModel.aggregate([
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
    lookupToPostConfiguration,
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

export const findPostById = async (postId, currentUserId) => {
  return await PostModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postId),
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
};

// create new post by current user and post configuration in separate document
export const createUserPost = async postDetails => {
  // Destructure all properties from postDetails
  const {
    postImage,
    userId,
    caption,
    isPublic,
    allowComments,
    allowSharing,
    allowSaving,
    displayLikeCount,
  } = postDetails;
  // create new post in database
  const createdPost = await PostModel.create({
    postImage,
    caption,
    creator: userId, // attach user Id as a creator of post
  });
  // here create post content configuration document of this post
  const createdPostConfig = await ContentConfiguration.create({
    postId: createdPost._id, // attach currently created post Id
    isPublic, // post public or private
    allowComments,
    allowSaving,
    allowSharing,
    displayLikeCount,
  });
  return { createdPost, createdPostConfig };
};

export const deletePostById = async postId => {
  // delete post document
  await PostModel.findByIdAndDelete(postId);
  // then delete its configuration document as well
  await ContentConfiguration.deleteOne({ postId });
};
