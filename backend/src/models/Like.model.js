import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.pre("aggregate", function (next) {
  this.project({
    followers: 0,
    following: 0,
    __v: 0,
    password: 0,
    updatedAt: 0,
    "follower.__v": 0,
    "follower.updatedAt": 0,
  });
  next();
});

const LikeModel = mongoose.model("Like", likeSchema);

export default LikeModel;
