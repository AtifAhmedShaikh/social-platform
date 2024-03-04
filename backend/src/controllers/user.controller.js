import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserServices from "../services/user.service.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserServices.findUsers();
  if (!users?.length) {
    throw new ApiError(404, "Users does not exits !");
  }
  new ApiResponse(200, { users }, "Users are fetched successfully !").send(res);
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id; // user ID to be find
  const user = await UserServices.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found ");
  }
  new ApiResponse(200, { user }, "User has fetched successfully !").send(res);
});

// Get current loggedIn user
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // get currently loggedIn user ID
  const currentUser = await UserServices.findUserById(userId);
  new ApiResponse(200, { user: currentUser }, "Current user fetched successfully !").send(res);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) {
    throw new ApiError(400, "username is required for fetch user profile !");
  }
  const profile = await UserServices.findUserProfileByUsername(username);
  if (!profile) {
    throw new ApiError(400, `${username}'s profile not found !`);
  }
  new ApiResponse(200, { profile }, ` ${username}'s Profile has fetched successfully !`).send(res);
});

export { getAllUsers, getUserById, getCurrentUser, getUserProfile };
