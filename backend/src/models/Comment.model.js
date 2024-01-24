import mongoose from "mongoose";
// model to user history of tracking to save any post,tweet or reels
const commentSchema = new mongoose.Schema(
  {
    // user who is commented on post or reel..
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // content or message of comment
    content: {
      type: String,
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
  },
  {
    timestamps: true,
  },
);

const CommentModel = mongoose.model("comment", commentSchema);
export default CommentModel;
