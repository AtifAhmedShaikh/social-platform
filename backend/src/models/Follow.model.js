import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    // user who is following this below user
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // user who get new follower
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

followSchema.pre("aggregate", function (next) {
  this.project({
    followers: 0,
    following: 0,
    __v: 0,
    updatedAt: 0,
    password: 0,
    "follower.__v": 0,
    "follower.updatedAt": 0,
  });
  next();
});

const FollowModel = mongoose.model("Follow", followSchema);

export default FollowModel;
