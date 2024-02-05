import mongoose from "mongoose";
import ContentConfiguration from "./ContentConfig.model.js";
// model to user history of tracking to save any post,tweet or reels
const reelsSchema = new mongoose.Schema(
  {
    // user who is create or upload the reel from users
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    reelVideoFile: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 60 * 3, // default 3mins
    },
  },
  {
    timestamps: true,
  },
);

const ReelModel = mongoose.model("reel", reelsSchema);

// Define custom method to create new post and a corresponding content config document as well in database
ReelModel.createReel = async function (reelData) {
  // create new post document in database
  const createdReel = await this.create({
    creator: reelData.creator,
    caption: reelData.caption,
    reelVideoFile: reelData.reelVideoFile,
  });
  // create new  config document for this reel, if any config property are not provided its default true
  await ContentConfiguration.create({
    reelId: createdReel._id, // attach currently created reel ID
    isPublic: reelData.isPublic ?? true,
    displayLikeCount: reelData.displayLikeCount ?? true,
    allowSaving: reelData.allowSaving ?? true,
    allowSharing: reelData.allowSharing ?? true,
  });
};

export default ReelModel;
