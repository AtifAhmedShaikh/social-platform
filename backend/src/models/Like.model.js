import mongoose from "mongoose";
// model to user history of tracking to save any post,tweet or reels
const likeSchema = new mongoose.Schema(
  {
    // user who is like the post or reel..
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    reel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reels",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tweets",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  },
  {
    timestamps: true,
  },
);

const LikeModel = mongoose.model("like", likeSchema);
export default LikeModel;
