import app from "../app.js";

const calculateLikesCountPipelines = foreignField => {
  const userId = app.locals.user?._id; // get loggedIn user Id from app variables
  const stage1 = {
    $lookup: {
      from: "likes",
      foreignField: foreignField, // this is one of them (posts,tweets,reels)
      localField: "_id",
      as: "likes",
    },
  };
  const stage2 = {
    $addFields: {
      likeCount: {
        $size: "$likes",
      },
      isLiked: {
        $in: [userId, "$likes.likedBy"],
      },
    },
  };
  return [stage1, stage2];
};

export { calculateLikesCountPipelines };
