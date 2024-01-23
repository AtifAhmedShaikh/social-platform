import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { findUserById, findUsers } from "../services/user.service.js";

const getUsers = asyncHandler(async (req, res) => {
  const usersList = await findUsers();
  if (!usersList?.length) {
    throw new ApiError(404, "users not found ");
  }
  const responseInstance = new ApiResponse(
    200,
    { users: usersList },
    "users fetched successfully! ",
  );
  res.status(200).json(responseInstance);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) {
    throw new ApiError(404, "user not found ");
  }
  const responseInstance = new ApiResponse(200, { user }, "users fetched successfully! ");
  res.status(200).json(responseInstance);
});

export { getUsers, getUserById };
