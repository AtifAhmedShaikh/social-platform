import mongoose from "mongoose";
import ContentConfiguration from "./ContentConfig.model.js";

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

// Define custom method to create new post and a corresponding content config document as well in database
PostModel.createPost = async function (postData) {
  // create new post document in database
  const createdPost = await this.create({
    creator: postData.creator,
    postImage: postData.postImage,
    caption: postData.caption,
  });
  // create new  config document for this post, if any config property are not provided its default true
  await ContentConfiguration.create({
    postId: createdPost._id, // attach currently created post ID
    isPublic: postData.isPublic ?? true,
    displayLikeCount: postData.displayLikeCount ?? true,
    allowSaving: postData.allowSaving ?? true,
    allowSharing: postData.allowSharing ?? true,
  });
  return createdPost;
};

// delete the post by ID and a corresponding content config document as well
PostModel.deletePostById = async function (postId) {
  await this.findByIdAndDelete(postId);
  await ContentConfiguration.deleteOne({ postId });
};

export default PostModel;
