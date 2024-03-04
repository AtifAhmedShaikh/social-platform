import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserModel from "../models/User.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import UserServices from "../services/user.service.js";

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user?._id; // extract loggedIn userId from request
  // fetch user from database with password
  const user = await UserModel.findById(userId).select("+password");
  // validate the user password with provided current password by using custom method
  const isValidPassword = await user.isCorrectPassword(currentPassword);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid current password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  new ApiResponse(200, {}, "password changes successfully").send(res);
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, username, bio } = req.body;
  const userId = req.user?._id;
  // Ensure provided username is not exists already
  const existedUser = await UserModel.findOne({ username });
  // If loggedIn user and existedUser are same, means existedUser is current user document
  if (existedUser?._id && String(existedUser?._id) !== String(userId)) {
    throw new ApiError(400, "username is already exists");
  }
  const updatedUser = await UserServices.findUserAndUpdate(
    { _id: userId },
    { name, username, bio },
  );
  new ApiResponse(200, { updatedUser }, "account has updated successfully ").send(res);
});

const changeUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req?.file?.path;
  const userId = req.user?._id;
  if (!avatarLocalPath) {
    throw new ApiError(400, "please upload Image to change the avatar ");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const updatedUserDetails = await UserServices.findUserAndUpdate(
    { _id: userId },
    { avatar: avatar?.secure_url },
  );

  new ApiResponse(
    200,
    { updatedAvatar: updatedUserDetails.avatar },
    "avatar has changed successfully ",
  ).send(res);
});

const changeUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req?.file?.path;
  const userId = req.user?._id;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "please upload Image to change the coverImage ");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  const updatedUserDetails = await UserServices.findUserAndUpdate(
    { _id: userId },
    { coverImage: coverImage?.secure_url },
  );

  new ApiResponse(
    200,
    { updatedCoverImage: updatedUserDetails.coverImage },
    "coverImage has changed successfully ",
  ).send(res);
});

export { changeCurrentUserPassword, updateAccountDetails, changeUserAvatar, changeUserCoverImage };
