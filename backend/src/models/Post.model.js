import mongoose from "mongoose";
import castAggregation from "mongoose-cast-aggregation";

mongoose.plugin(castAggregation);

const postSchema = new mongoose.Schema(
  {
    owner: {
      // user who is create or upload the post from users
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    // private post only for his followers but public is for everyone
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

postSchema.pre("aggregate", function (next) {
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

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
