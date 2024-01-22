import { ACCESS_TOKEN_SECRET } from "../config/envConfig.js";
import { findUserById } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";

// middleware to authenticate user based on provided access token using Jwt
export const authenticateUser = asyncHandler(async (req, res, next) => {
  // extract token from cookies or request header
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "unauthorized request, token not found !");
  }
  const decoded = Jwt.verify(token, ACCESS_TOKEN_SECRET);
  // fetch the user from the database based on the decoded user ID
  const user = await findUserById(decoded?._id);
  if (!user) {
    throw new ApiError(401, "unauthorized request, Invalid access token !");
  }
  req.user = user;
  next();
});

