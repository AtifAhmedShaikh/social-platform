import { ACCESS_TOKEN_SECRET } from "../config/envConfig.js";
import { findPostById } from "../services/post.service.js";
import { findTweetById } from "../services/tweet.service.js";
import { findUserById } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";

// middleware to authenticate user based on provided access token using Jwt
export const authenticateUser = asyncHandler(async (req, res, next) => {
  try {
    // extract token from cookies or request header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "unauthorized request, token not found !");
    }
    const decoded =await Jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log(decoded);
    // fetch the user from the database based on the decoded user ID
    const user = await findUserById(decoded?._id);
    if (!user) {
      throw new ApiError(401, "unauthorized request, Invalid access token !");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "unauthorized request, access token has expired !", error);
  }
});

// middleware to ensure user has authorized to delete post,reel,tweet,comment
export const isAuthorizedToDelete = deletingDocumentType => {
  return asyncHandler(async (req, res, next) => {
    const documentId = req.params.id; // extract document Id of  post,reel,tweet,comments
    const userId = req.user?._id; // extract loggedIn user Id
    // If user has delete his post
    if (deletingDocumentType === "POST") {
      const postToBeDeleted = await findPostById(documentId);
      if (!postToBeDeleted) {
        throw new ApiError(404, "post not found, Invalid post Id");
      }
      // check the post creator is current user or not, convert mongoose ObjectId into string
      if (String(postToBeDeleted?.creator?._id) === String(userId)) {
        return next(); // pass control into next handler
      }
      throw new ApiError(
        401,
        `you unauthorized to delete this ${deletingDocumentType?.toLowerCase()}`,
      );
    } else if (deletingDocumentType === "TWEET") {
      const tweetToBeDeleted = await findTweetById(documentId);
      if (!tweetToBeDeleted) {
        throw new ApiError(404, "tweet not found, Invalid post Id");
      }
      // check the tweet creator is current user or not, convert mongoose ObjectId into string
      if (String(tweetToBeDeleted?.author?._id) === String(userId)) {
        return next(); // pass control into next handler
      }
      throw new ApiError(
        401,
        `you unauthorized to delete this ${deletingDocumentType?.toLowerCase()}`,
      );
    }
  });
};
