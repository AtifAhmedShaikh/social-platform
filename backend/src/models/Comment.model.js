import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // user who is commented on post or reel..
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

commentSchema.pre("aggregate", function (next) {
  this.project({
    __v: 0,
    followers: 0,
    likes: 0,
    likes: 0,
    "owner.__v": 0,
    "owner.updatedAt": 0,
    "owner.password": 0,
  });
  next();
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
