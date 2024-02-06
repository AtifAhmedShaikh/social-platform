import mongoose from "mongoose";

// User Gallery, user has save any post,reel,tweet called as Gallery
const userGallerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    reels: [{ type: mongoose.Schema.Types.ObjectId, ref: "reel" }],
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "reel" }],
  },
  {
    timestamps: true,
  },
);

const GalleryModel = mongoose.model("Gallery", userGallerySchema);

export default GalleryModel;
