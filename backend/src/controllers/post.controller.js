import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import PostServices from "../services/post.service.js";

const getAllPosts = asyncHandler(async (_, res) => {
  const posts = await PostServices.findPosts();
  if (!posts?.length) {
    throw new ApiError(404, "Posts does not exists !");
  }
  new ApiResponse(200, { posts }, "Posts are fetched successfully").send(res);
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const post = await PostServices.findPostById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found !");
  }
  new ApiResponse(200, { post }, "Post are fetched successfully").send(res);
});

const createPost = asyncHandler(async (req, res) => {
  const userId = req.user._id; // loggedIn user Id
  const { caption, isPublic, allowComments, allowSaving } = req.body;
  const postImageLocalPath = req.file?.path;

  if (!postImageLocalPath) {
    throw new ApiError(400, "Please Upload a Image for Post ");
  }
  // upload Image on cloudinary and get secure url of Image as postImageURL
  const { secure_url: postImageURL } = await uploadOnCloudinary(postImageLocalPath);
  // create new post document by using custom method of post services
  const createdPost = await PostServices.createPost({
    owner: userId,
    postImage: postImageURL,
    caption,
    isPublic,
    allowComments,
    allowSaving,
  });

  new ApiResponse(200, { post: createdPost }, "Post has created successfully").send(res);
});

const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id; // targeted post ID to be update
  const { caption, isPublic, allowComments, allowSaving } = req.body;
  const updatedPost = await PostServices.updatePost(postId, {
    caption,
    isPublic,
    allowComments,
    allowSaving,
  });
  if (!updatedPost) {
    throw new ApiError(500, "Some thing went wrong while updating the post !");
  }
  new ApiResponse(200, { post: updatedPost }, "Post has updated successfully !").send(res);
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const deletedPost = await PostServices.deletePostById(postId);
  if (!deletedPost) {
    throw new ApiError(500, "Some thing went wrong while deleting the post !");
  }
  new ApiResponse(200, {}, "Post has deleted successfully").send(res);
});

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
