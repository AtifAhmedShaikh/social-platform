import mongoose from "mongoose";
// model to user history of tracking to save any post,tweet or reels
const tweetSchema = new mongoose.Schema(
  {
    // user who is write a tweet
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TweetModel = mongoose.model("tweet", tweetSchema);
export default TweetModel;
