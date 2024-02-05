import mongoose from "mongoose";
import ContentConfiguration from "./ContentConfig.model.js";
// model to user history of tracking to save any post,tweet or reels
const tweetSchema = new mongoose.Schema(
  {
    // user who is write a tweet
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

// Define custom method to create new tweet and a corresponding content config document as well in database
TweetModel.createTweet = async function (tweetData) {
  // create new tweet document in database
  const createdTweet = await this.create({
    content: tweetData.content,
    author: tweetData.author,
  });
  // create new  config document for this tweet, if any config property are not provided its default true
  await ContentConfiguration.create({
    tweetId: createdTweet._id, // attach currently created tweet ID
    isPublic: tweetData.isPublic ?? true,
    displayLikeCount: tweetData.displayLikeCount ?? true,
    allowSaving: tweetData.allowSaving ?? true,
    allowSharing: tweetData.allowSharing ?? true,
  });
  return createdTweet;
};

export default TweetModel;
