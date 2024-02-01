import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { cookieOptions } from "../config/options.js";
import Jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/envConfig.js";
import {
  generateAccessAndRefreshToken,
  deleteRefreshTokenFromDatabase,
} from "../services/tokens.service.js";
import {
  createUser,
  findUserById,
  findUserByUsernameOrEmail,
} from "../services/user.service.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, bio } = req.body;
  // check the provided email or username is already exist in database
  const existedUser = await findUserByUsernameOrEmail(username, email);
  if (existedUser) {
    throw new ApiError(400, "username or email is already exists");
  }
  // optionally extract Images local path if user uploaded
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "avatar and coverImage are required");
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
  // generate access and refresh token and refresh token store in database
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser?._id);
  // set both tokens in cookies
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
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
  const user = await findUserByUsernameOrEmail(username, username);
  if (!user) {
    throw new ApiError(400, "Invalid username or password ");
  }

  const isValidPassword = await user.isCorrectPassword(password);
  if (!isValidPassword) {
    throw new ApiError(400, "Invalid username or password ");
  }
  // Generate access and refresh token, refresh token store in database
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);

  const responseInstance = new ApiResponse(200, { user }, "user loggedIn successfully ");
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json(responseInstance);
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // delete user refresh token  from database
  await deleteRefreshTokenFromDatabase(userId);

  // clear tokens from user cookies
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  const responseInstance = new ApiResponse(200, {}, "user successfully logout");
  res.status(200).json(responseInstance);
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
  const user = await findUserById(decoded?._id);
  if (!user) {
    throw new ApiError(401, "unauthorized request,refresh token has been expired !");
  }
  // generate access and refresh and update previous refresh token in database
  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user?._id);
  const responseInstance = new ApiResponse(200, {}, "access token has refreshed ");
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json(responseInstance);
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
