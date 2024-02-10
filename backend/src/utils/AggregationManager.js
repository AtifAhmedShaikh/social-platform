import mongoose from "mongoose";

const AggregationStage = {
  // utility method to create lookup stage based on provided parameter
  createLookup: (collection, localField, foreignField, name, nestedPipelines = []) => {
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
  },
  // method to generate projection pipeline stage based on provided attributes in string
  generateProjection: attributes => {
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
  },
  // attach new boolean field by provided condition
  attachBooleanFieldByCondition: (field, condition) => {
    return {
      [field]: {
        $cond: {
          if: condition(),
          then: true,
          else: false,
        },
      },
    };
  },
  // method to join owner details document on post,reel,tweet
  joinOwnerDetails: localField => {
    return {
      $lookup: {
        from: "users",
        localField: localField,
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $addFields:
              // check current user has uploaded this content [posts,reel,tweets]
              {
                ...attachBooleanFieldByCondition("isUploadedByMe", () => {
                  return { $eq: ["$_id", new mongoose.Types.ObjectId("65c090d0a02642d32c183e1f")] };
                }),
              },
          },
        ],
      },
    };
  },
};
// addFields->
// "field",()=>{
// return {$in:[]}
// }
export default AggregationStage;

export const createLookup = (collection, localField, foreignField, name, nestedPipelines = []) => {
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

export const attachBooleanFieldByCondition = (field, condition) => {
  return {
    [field]: {
      $cond: {
        if: condition(),
        then: true,
        else: false,
      },
    },
  };
};

// method to generate projection pipeline stage based on provided attributes in string
export const generateProjection = attributes => {
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

export const attachField = attr => {
  const projectionStage = {
    $addFields: {},
  };
  if (attr) {
    const projectionFields = attr.split("|").reduce((acc, field) => {
      const [key, value] = field.split(":");
      acc[value] = { [key]: `$${value}` };
      return acc;
    }, {});
    projectionStage.$addFields = { ...projectionStage.$addFields, ...projectionFields };
  }
  return projectionStage;
};
console.log("---", attachField("$first:owner"));

export const joinOwnerDetails = localField => {
  return {
    $lookup: {
      from: "users",
      localField: localField,
      foreignField: "_id",
      as: "owner",
      pipeline: [
        createLookup("users", "_id", "user", "followers"),
        attachField("$first:owner"),
        {
          $addFields: {
            ...attachBooleanFieldByCondition("isUploadedByMe", () => {
              return { $eq: ["$_id", new mongoose.Types.ObjectId("65c090d0a02642d32c183e1f")] };
            }),
            ...attachBooleanFieldByCondition("isFollowing", () => {
              return {
                $in: [
                  new mongoose.Types.ObjectId("65c090d0a02642d32c183e1f"),
                  "$followers.follower",
                ],
              };
            }),
          },
        },
      ],
    },
  };
};
