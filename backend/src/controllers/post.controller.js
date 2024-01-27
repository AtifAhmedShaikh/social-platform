import {
  findPosts,
  findPostById,
  createUserPost,
  deletePostById,
} from "../services/post.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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
  if (!post?.length) {
    throw new ApiError(404, "post not found !");
  }
  const responseInstance = new ApiResponse(200, { post: post[0] }, "posts are fetched successfully");
  res.status(200).json(responseInstance);
});

const createPost = asyncHandler(async (req, res) => {
  const userId = req.user._id; // loggedIn user Id
  // extract post data from request, middleware has attached postData in body after validation
  const postData = req.body;
  const postImageLocalPath = req.file?.path;
  if (!postImageLocalPath) {
    throw new ApiError(400, "upload Image for post");
  }
  // upload Image on cloudinary and get secure url of Image
  const postImage = await uploadOnCloudinary(postImageLocalPath);
  const createdPost = await createUserPost({
    ...postData,
    userId,
    postImage: postImage.secure_url,
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
  await deletePostById(postId);
  const responseInstance = new ApiResponse(200, {}, "post has deleted successfully! ");
  res.status(201).json(responseInstance);
});

export { getPosts, getPostById, createPost, deletePost };
