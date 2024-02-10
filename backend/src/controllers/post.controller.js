import {
  findPosts,
  findPostById,
} from "../services/post.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import PostModel from "../models/Post.model.js";

const getPosts = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const posts = await findPosts(userId);
  if (!posts?.length) {
    throw new ApiError(404, "posts does not exists !");
  }
  const responseInstance = new ApiResponse(200, { posts }, "posts are fetched successfully");
  res.status(200).json(responseInstance);
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const post = await findPostById(postId, userId);
  if (!post) {
    throw new ApiError(404, "post not found !");
  }
  const responseInstance = new ApiResponse(200, { post }, "post are fetched successfully");
  res.status(200).json(responseInstance);
});

const createPost = asyncHandler(async (req, res) => {
  const userId = req.user._id; // loggedIn user Id
  const { caption, ...postConfig } = req.body;
  const postImageLocalPath = req.file?.path;
  // post must have Image and caption
  if (!postImageLocalPath || !caption?.trim()) {
    throw new ApiError(400, "upload post Image and write caption ");
  }
  // upload Image on cloudinary and get secure url of Image
  const postImage = await uploadOnCloudinary(postImageLocalPath);
  // create new post document by using custom method
  const createdPost = await PostModel.createPost({
    creator: userId,
    postImage: postImage.secure_url,
    caption: caption,
    ...postConfig,
  });
  const responseInstance = new ApiResponse(
    201,
    { post: createdPost },
    "post created successfully!",
  );
  res.status(201).json(responseInstance);
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  await PostModel.deletePostById(postId);
  const responseInstance = new ApiResponse(200, {}, "post has deleted successfully! ");
  res.status(200).json(responseInstance);
});

export { getPosts, getPostById, createPost, deletePost };
