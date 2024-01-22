import mongoose from "mongoose";
// model to user history of tracking to save any post,tweet or reels
const postSchema = new mongoose.Schema(
  {
    creator: {
      // user who is create or upload the post from users
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PostModel = mongoose.model("posts", postSchema);
export default PostModel;
