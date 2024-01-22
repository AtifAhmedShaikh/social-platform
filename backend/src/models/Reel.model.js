import mongoose from "mongoose";
// model to user history of tracking to save any post,tweet or reels
const reelsSchema = new mongoose.Schema(
  {
    // user who is create or upload the reel from users
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
export default ReelModel;
