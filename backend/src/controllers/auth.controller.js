import UserModel from "../models/User.model.js";
import {
  createUserRefreshTokenInDatabase,
  deleteUserRefreshTokenFromDatabase,
} from "../services/tokens.service.js";
import { createUser, findUserById } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { cookieOptions } from "../config/options.js";
import Jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/envConfig.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, bio } = req.body;
  if (!name || !username || !email || !password || !bio) {
    throw new ApiError(400, "fields are required");
  }
  const existedUser = await UserModel.findOne({
    $or: [{ username, email }],
  });
  // If user email or username is already exist in database
  if (existedUser) {
    throw new ApiError(400, "username or email is already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // If avatar or coverImage are not provided by user
  if (!avatarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "avatar and coverImage both are required !");
  }
  // upload avatar and coverImage on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const createdUser = await createUser({
    name,
    username,
    email,
    password,
    bio,
    avatar: avatar.secure_url,
    coverImage: coverImage.secure_url,
  });
  console.log(createdUser);
  const responseInstance = new ApiResponse(
    201,
    { user: createdUser },
    "user has created successfully !",
  );
  res.status(200).json(responseInstance);
});

// login user basis on username or email
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ $or: [{ username }, { email: username }] }).select(
    "+password",
  );
  if (!user) {
    throw new ApiError(400, "Invalid username or password ");
  }

  const isValidPassword = await user.isCorrectPassword(password);
  if (!isValidPassword) {
    throw new ApiError(400, "Invalid username or password ");
  }

  // Generate access and refresh token, refresh token save in database
  const { accessToken, refreshToken } = await createUserRefreshTokenInDatabase(user?._id);

  const responseInstance = new ApiResponse(200, { user }, "user loggedIn successfully ");
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json(responseInstance);
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // delete user refresh token document from database in tokens collection
  await deleteUserRefreshTokenFromDatabase(userId);

  // clear tokens from user cookies
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  const responseInstance = new ApiResponse(200, {}, "user successfully logout");
  res.status(200).json(responseInstance);
});

/**
 * controller for responsible to auto login after access token expired
 * user access token has expired after 2 hours
 * to avoid the repetition of after every 2 hours login
 * Get refresh token from  cookies the verify It using JWT
 * delete previous from database and generate new access and refresh token
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  // extract refresh token from user cookies
  const refreshTokenInCookies = req.cookies?.refreshToken;
  if (!refreshTokenInCookies) {
    throw new ApiError(401, "unauthorized request,refresh token not found !");
  }
  const decoded = Jwt.verify(refreshTokenInCookies, REFRESH_TOKEN_SECRET);
  const user = await findUserById(decoded?._id);
  if (!user) {
    throw new ApiError(401, "unauthorized request,refresh token has been expired !");
  }
  // delete previous refresh token from database
  await deleteUserRefreshTokenFromDatabase(user._id);
  // create new  refresh token in database
  const { accessToken, refreshToken } = await createUserRefreshTokenInDatabase(user?._id);

  const responseInstance = new ApiResponse(200, {}, "access token has refresh ");
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json(responseInstance);
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
