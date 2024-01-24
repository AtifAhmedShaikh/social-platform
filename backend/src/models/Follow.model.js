import mongoose from "mongoose";
// model to user history of tracking to save any post,tweet or reels
const followSchema = new mongoose.Schema(
  {
    // user who is following this below user
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // user who get new follower
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FollowModel = mongoose.model("follow", followSchema);
export default FollowModel;
