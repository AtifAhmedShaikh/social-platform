import mongoose from "mongoose";
// declare aggregation pipelines stages for fetch complete details of every post,reel,tweet and comment
// method to apply projection based on provided attributes and return pipeline stage of projection
const stageToApplyProjectionInDocument = attributes => {
  const projectionStage = {
    $project: {},
  };

  if (attributes) {
    const projectionFields = attributes.split(",").reduce((acc, field) => {
      const [key, value] = field.split(":");
      acc[key] = value === "1" ? 1 : 0;
      return acc;
    }, {});

    projectionStage.$project = { ...projectionStage.$project, ...projectionFields };
  }
  return projectionStage;
};

const stageToGetCreator = (localField, loggedInUserID) => {
  const pipelineStage = {
    $lookup: {
      from: "users",
      foreignField: "_id",
      localField: localField,
      as: localField, // override same as local field name
      pipeline: [
        // add new fields in creator document
        stageToGetUserFollowers(),
        {
          $addFields: {
            // boolean value for this content is uploaded by current loggedIn user or not
            isUploadedByMe: {
              $cond: {
                if: { $eq: ["$_id", new mongoose.Types.ObjectId(loggedInUserID)] },
                then: true,
                else: false,
              },
            },
            isFollowing: {
              $cond: {
                if: { $in: [new mongoose.Types.ObjectId(loggedInUserID), "$followers.follower"] },
                then: true,
                else: false,
              },
            },
          },
        },
        // apply projection pipeline on creator document to get only selected fields
        stageToApplyProjectionInDocument("_id:1,name:1,username:1,avatar:1,isUploadedByMe:1,isFollowing:1"),
      ],
    },
  };
  return pipelineStage;
};

const stageToGetContentConfig = foreignField => {
  const pipeline = {
    $lookup: {
      from: "contentconfigs",
      foreignField: foreignField,
      localField: "_id",
      as: "configuration",
      pipeline: [
        // apply projection pipeline on content config document to remove unwanted fields
        stageToApplyProjectionInDocument("updatedAt:0,__v:0,_id:0,createdAt:0,postId:0"),
      ],
    },
  };
  return pipeline;
};

// stage to get likes array of provided foreignField
const stageToGetLikes = foreignField => {
  const pipeline = {
    $lookup: {
      from: "likes",
      foreignField: foreignField,
      localField: "_id",
      as: "likeCount",
    },
  };
  return pipeline;
};

const stageToGetComments = foreignField => {
  const pipeline = {
    $lookup: {
      from: "comments",
      foreignField: foreignField,
      localField: "_id",
      as: "commentCount",
    },
  };
  return pipeline;
};

const stageToAttachFieldsInDocuments = (userFieldName, loggedInUserID) => {
  const pipeline = {
    $addFields: {
      [userFieldName]: { $first: `$${userFieldName}` },
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
            $in: [new mongoose.Types.ObjectId(loggedInUserID), "$likeCount.likedBy"],
          },
          then: true,
          else: false,
        },
      },
    },
  };
  return pipeline;
};

const stageToMatchDocumentById = (targetedFieldToMatch, targetedId) => {
  const pipeline = {
    $match: {
      [targetedFieldToMatch]: new mongoose.Types.ObjectId(targetedId),
    },
  };
  return pipeline;
};

const stageToGetUserFollowers = () => {
  const pipeline = {
    $lookup: {
      from: "follows",
      foreignField: "user",
      localField: "_id",
      as: "followers",
    },
  };
  return pipeline;
};

const stageToGetUserFollowing = () => {
  const pipeline = {
    $lookup: {
      from: "follows",
      foreignField: "follower",
      localField: "_id",
      as: "following",
    },
  };
  return pipeline;
};

const stageToAttachFieldsInUserDocument = loggedInUserID => {
  const pipeline = {
    $addFields: {
      isFollowing: {
        $cond: {
          if: { $in: [new mongoose.Types.ObjectId(loggedInUserID), "$followers.follower"] },
          then: true,
          else: false,
        },
      },
      followerCount: {
        $size: "$followers",
      },
      followingCount: {
        $size: "$following",
      },
    },
  };
  return pipeline;
};
export {
  // generateLookupStage
  stageToMatchDocumentById, // createMatchStage,generateMatchStage
  stageToGetCreator,
  stageToGetContentConfig, // getContentConfigStage
  stageToGetLikes, // getLikeStage
  stageToGetComments,
  stageToAttachFieldsInDocuments, // attachFieldsStage
  stageToGetUserFollowing,
  stageToGetUserFollowers, // getFollowersStage
  stageToAttachFieldsInUserDocument,
  stageToApplyProjectionInDocument,
};
