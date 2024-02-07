import mongoose from "mongoose";

// model to track user like history of posts,reels,tweets and as well as reelWatchHistory
const historySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    reelsWatchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reels",
      },
    ],
    reels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reels",
      },
    ],
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweets",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const UserHistory = mongoose.model("history", historySchema);
export default UserHistory;
