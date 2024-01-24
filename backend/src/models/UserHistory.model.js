import mongoose from "mongoose";
// model to user history of tracking to save any post,tweet or reels
const historySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
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
        ref: "tweets",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const UserHistory = mongoose.model("history", historySchema);
export default UserHistory;
