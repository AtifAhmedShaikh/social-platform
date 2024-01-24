import mongoose from "mongoose";

const ContentConfigurationSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    reelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reels",
    },
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tweets",
    },
    // public post & reel & tweet can see every user but private post only for creator followers
    isPublic: {
      type: Boolean,
      default: true,
    },
    // disable or enable comments
    allowComments: {
      type: Boolean,
      default: true,
    },
    // users also like but anyone can't not see like count
    displayLikeCount: {
      type: Boolean,
      default: true,
    },
    allowSharing: {
      type: Boolean,
      default: true,
    },
    allowSaving: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const ContentConfiguration = mongoose.model("contentConfiguration", ContentConfigurationSchema);

export default ContentConfiguration;
