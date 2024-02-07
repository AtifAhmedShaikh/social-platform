import mongoose from "mongoose";
import UserHistory from "./UserHistory.model.js";

const likeSchema = new mongoose.Schema(
  {
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

// Middleware to add or remove liked posts, reels, tweets from user liked History
likeSchema.post("save", async function (doc, next) {
  try {
    // If user likes the post, add this post to the user's liked history
    if (this.post) {
      await UserHistory.findOneAndUpdate({ owner: this.likedBy }, { $push: { posts: this.post } });
    } else if (this.reel) {
      await UserHistory.findOneAndUpdate({ owner: this.likedBy }, { $push: { reels: this.reel } });
    } else if (this.tweet) {
      await UserHistory.findOneAndUpdate(
        { owner: this.likedBy },
        { $push: { tweets: this.tweet } },
      );
    }

    next();
  } catch (error) {
    console.error("Error in post save middleware:");
    next(error);
  }
});

likeSchema.pre("findOneAndDelete", async function (next) {
  try {
    const docToUpdate = await this.model.findOne(this.getQuery()); // access of currently like document
    // If user unlike the post, remove this post from the user's liked history
    if (docToUpdate.post) {
      await UserHistory.findOneAndUpdate(
        { owner: docToUpdate.likedBy },
        { $pull: { posts: docToUpdate.post } },
      );
    } else if (docToUpdate.reel) {
      await UserHistory.findOneAndUpdate(
        { owner: docToUpdate.likedBy },
        { $pull: { reels: docToUpdate.reel } },
      );
    } else if (docToUpdate.tweet) {
      await UserHistory.findOneAndUpdate(
        { owner: docToUpdate.likedBy },
        { $pull: { tweets: docToUpdate.tweet } },
      );
    }
    next();
  } catch (error) {
    console.error("Error in pre findOneAndDelete middleware:");
    next(error);
  }
});

const LikeModel = mongoose.model("like", likeSchema);
export default LikeModel;
