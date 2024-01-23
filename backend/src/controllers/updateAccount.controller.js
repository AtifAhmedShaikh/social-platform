import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserModel from "../models/User.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { findUserAndUpdate, isUserExists } from "../services/user.service.js";

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "password fields are required !");
  }
  const userId = req.user?._id; // extract loggedIn userId from request
  // fetch user from database with password and validate the password
  const user = await UserModel.findById(userId).select("+password");
  const isValidPassword = await user.isCorrectPassword(currentPassword);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid current password");
  }
  const updatedUser = await findUserAndUpdate({ _id: userId }, { $set: { password: newPassword } });

  const responseInstance = new ApiResponse(200, { updatedUser }, "password changes successfully");
  res.status(200).json(responseInstance);
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, username, email, bio } = req.body;
  const userId = req.user?._id;
  // check provided username or email is not exists already
  const existedUser = await isUserExists(username, email);
  // If loggedIn user and existedUser are same, means existedUser is current user document
  if (existedUser && existedUser?._id !== userId) {
    throw new ApiError(400, "username or email is already exists");
  }
  const updatedUser = await findUserAndUpdate(
    { _id: userId },
    { $set: { name, username, email, bio } },
  );
  const responseInstance = new ApiResponse(
    200,
    { updatedUser },
    "account has updated successfully ",
  );
  res.status(200).json(responseInstance);
});

const changeUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req?.file?.path;
  const userId = req.user?._id;
  if (!avatarLocalPath) {
    throw new ApiError(400, "please upload Image to change the avatar ");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const updatedAvatar = await findUserAndUpdate(
    { _id: userId },
    { $set: { avatar: avatar?.secure_url } },
  );

  const responseInstance = new ApiResponse(
    200,
    { updatedAvatar },
    "avatar has changed successfully ",
  );
  res.status(200).json(responseInstance);
});

const changeUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req?.file?.path;
  const userId = req.user?._id;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "please upload Image to change the coverImage ");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  const updatedCoverImage = await findUserAndUpdate(
    { _id: userId },
    { $set: { coverImage: coverImage?.secure_url } },
  );

  const responseInstance = new ApiResponse(
    200,
    { updatedCoverImage },
    "coverImage has changed successfully ",
  );
  res.status(200).json(responseInstance);
});
export { changeCurrentUserPassword, updateAccountDetails, changeUserAvatar, changeUserCoverImage };
