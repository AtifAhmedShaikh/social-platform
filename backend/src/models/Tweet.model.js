import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    // user who is added a tweet
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // private tweet only for his followers but public is for everyone
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

tweetSchema.pre("aggregate", function (next) {
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

const TweetModel = mongoose.model("Tweet", tweetSchema);

export default TweetModel;
