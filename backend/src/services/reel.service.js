import ReelModel from "../models/Reel.model.js";
import ContentConfiguration from "../models/ContentConfiguration.model.js";

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
