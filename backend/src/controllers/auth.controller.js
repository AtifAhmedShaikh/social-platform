import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { cookieOptions } from "../config/options.js";
import Jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/envConfig.js";
import UserServices from "../services/user.service.js";
import {
  generateAccessAndRefreshToken,
  deleteRefreshTokenFromDatabase,
} from "../services/tokens.service.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, bio } = req.body;
  // check the provided email or username is already exist in database
  const userAlreadyExists = await UserServices.findUserByUsernameOrEmail(username, email);
  if (userAlreadyExists) {
    throw new ApiError(409, "username or email is already exists");
  }
  // optionally extract Images local path if user uploaded
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  if (!avatarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "avatar and coverImage are required");
  }
  // upload avatar and coverImage on cloudinary and get URL Images
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const createdUser = await UserServices.createUser({
    name,
    username,
    email,
    password,
    bio,
    avatar: avatar.secure_url,
    coverImage: coverImage.secure_url,
  });
  // generate access and refresh token and refresh token store in database
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser?._id);
  // set access and refresh tokens in cookies
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  new ApiResponse(
    201,
    { user: createdUser, accessToken, refreshToken },
    "user has created successfully !",
  ).send(res);
});

// login user basis on username or email
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await UserServices.findUserByUsernameOrEmail(username, username);
  if (!user) {
    throw new ApiError(400, "Invalid username or password ");
  }

  const isValidPassword = await user.isCorrectPassword(password);
  if (!isValidPassword) {
    throw new ApiError(400, "Invalid username or password ");
  }
  // Generate access and refresh token, refresh token store in database
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  new ApiResponse(200, { user, accessToken, refreshToken }, "user loggedIn successfully ").send(
    res,
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // delete user refresh token  from database
  await deleteRefreshTokenFromDatabase(userId);

  // clear tokens from user cookies
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  new ApiResponse(200, {}, "user logout successfully !").send(res);
});

// controller for responsible to auto login after access token expired
const refreshAccessToken = asyncHandler(async (req, res) => {
  // extract refresh token from user cookies
  const refreshTokenInCookies = req.cookies?.refreshToken;
  if (!refreshTokenInCookies) {
    throw new ApiError(401, "unauthorized request, refresh token not found !");
  }
  // verify refresh token using JWT and get userId from decoded Information and find the User
  const decoded = Jwt.verify(refreshTokenInCookies, REFRESH_TOKEN_SECRET);
  const user = await UserServices.findUserById(decoded?._id);
  if (!user) {
    throw new ApiError(401, "unauthorized request, refresh token has been expired !");
  }
  // generate access and refresh and update previous refresh token in database
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  new ApiResponse(200, {}, "access token has refreshed ").send(res);
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
