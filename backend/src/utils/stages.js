import mongoose from "mongoose";

// Utility functions for aggregation pipelines
const createLookup = (collection, localField, foreignField, name, nestedPipelines = []) => {
  const pipelineStage = {
    $lookup: {
      from: collection,
      foreignField: foreignField,
      localField: localField,
      as: name,
      pipeline: nestedPipelines, // nested pipeline
    },
  };
  return pipelineStage;
};

const generateProjection = attributes => {
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

const attachFieldsInDocument = (fields, conditionalFields) => {
  const projectionStage = {
    $addFields: {},
  };
  if (fields) {
    const projectionFields = fields.split(",").reduce((acc, field) => {
      const [key, value] = field.split(":");
      acc[value] = { [key]: `$${value}` };
      return acc;
    }, {});
    projectionStage.$addFields = { ...projectionStage.$addFields, ...projectionFields };
  }

  if (conditionalFields === null) {
    projectionStage.$addFields = {
      ...projectionStage.$addFields,
      isUploadedByMe: {
        $cond: {
          if: { $eq: ["$_id", new mongoose.Types.ObjectId("65c20de7cfa7cc7c607f67ee")] },
          then: true,
          else: false,
        },
      },
      isFollowing: {
        $cond: {
          if: {
            $in: [new mongoose.Types.ObjectId("65c20de7cfa7cc7c607f67ee"), "$followers.follower"],
          },
          then: true,
          else: false,
        },
      },
    };
  } else if (conditionalFields === "isLiked") {
    projectionStage.$addFields = {
      ...projectionStage.$addFields,
      isLiked: {
        $cond: {
          if: {
            $in: [new mongoose.Types.ObjectId("65c20de7cfa7cc7c607f67ee"), "$likeCount.likedBy"],
          },
          then: true,
          else: false,
        },
      },
    };
  }
  return projectionStage;
};

// pipeline to join owner details of every post,reel,tweet,comment
const joinCreatorDetails = localField => {
  return {
    $lookup: {
      from: "users",
      localField: localField,
      foreignField: "_id",
      as: "owner",
      pipeline: [
        createLookup("follows", "_id", "user", "followers"), // stage to get followers list of creator
        attachFieldsInDocument(null, null), // stage to attach new fields in document
        generateProjection("_id:1,name:1,username:1,avatar:1,isUploadedByMe:1,isFollowing:1"), // apply project to get only selected fields
      ],
    },
  };
};

const filterPublicDocuments = () => {
  return {
    $match: {
      $or: [
        { "configuration.isPublic": true }, // Include public posts
        {
          $and: [
            { "configuration.isPublic": false }, // Exclude private posts
            { "creator.isFollowing": true }, // Include private posts if following the creator
          ],
        },
      ],
    },
  };
};

const matchDocumentById = (targetedFieldToMatch, targetedId) => {
  const pipeline = {
    $match: {
      [targetedFieldToMatch]: new mongoose.Types.ObjectId(targetedId),
    },
  };
  return pipeline;
};
export {
  createLookup,
  generateProjection,
  attachFieldsInDocument,
  joinCreatorDetails,
  filterPublicDocuments,
  matchDocumentById,
};
