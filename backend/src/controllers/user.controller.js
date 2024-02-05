import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { findUserById, findUserProfileByUsername, findUsers } from "../services/user.service.js";

const getUsers = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const users = await findUsers(userId);
  if (!users?.length) {
    throw new ApiError(404, "users not found ");
  }
  const responseInstance = new ApiResponse(200, { users }, "users fetched successfully! ");
  res.status(200).json(responseInstance);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) {
    throw new ApiError(404, "user not found ");
  }
  const responseInstance = new ApiResponse(200, { user }, "user fetched successfully! ");
  res.status(200).json(responseInstance);
});

// Get current loggedIn user
const getCurrentUser = asyncHandler((req, res) => {
  const user = req.user;
  const responseInstance = new ApiResponse(200, { user }, "users fetched successfully! ");
  res.status(200).json(responseInstance);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const userId = req.user._id;
  if (!username?.trim()) {
    throw new ApiError(400, "username is required for fetch user profile !");
  }
  const profile = await findUserProfileByUsername(username, userId);
  if (!profile) {
    throw new ApiError(400, `${username}'s profile not found !`);
  }
  const responseInstance = new ApiResponse(200, { profile }, "user profile fetched successfully! ");
  res.status(200).json(responseInstance);
});

export { getUsers, getUserById, getCurrentUser, getUserProfile };
