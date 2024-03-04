import mongoose from "mongoose";

const reelsSchema = new mongoose.Schema(
  {
    // user who is create or upload the reel from users
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    // private reel only for his followers but public is for everyone
    isPublic: {
      type: Boolean,
      default: true,
    },
    // allow to write comments on post
    allowComments: {
      type: Boolean,
      default: true,
    },
    // allow to save the post
    allowSaving: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

reelsSchema.pre("aggregate", function (next) {
  this.project({
    __v: 0,
    followers: 0,
    following: 0,
    likes: 0,
    comments: 0,
    "owner.__v": 0,
    "owner.updatedAt": 0,
    "owner.password": 0,
  });
  next();
});

const ReelModel = mongoose.model("Reel", reelsSchema);

export default ReelModel;
