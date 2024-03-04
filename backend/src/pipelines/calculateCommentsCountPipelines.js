const calculateCommentsCountPipelines = foreignField => {
  const stage1 = {
    $lookup: {
      from: "comments",
      foreignField: foreignField,
      localField: "_id",
      as: "comments",
    },
  };
  const stage2 = {
    $addFields: {
      commentCount: {
        $size: "$comments",
      },
    },
  };
  return [stage1, stage2];
};

export { calculateCommentsCountPipelines };
