import { ACCESS_TOKEN_SECRET } from "../config/envConfig.js";
import UserServices from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";
import app from "../app.js";

// middleware to authenticate user based on provided access token using Jwt
export const authenticateUser = asyncHandler(async (req, _, next) => {
  try {
    // extract access token from cookies or request header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "unauthorized request, token not found !");
    }
    const decoded = Jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log("I am after decoded");
    // fetch the user from the database based on the decoded user ID
    const user = await UserServices.findUserById(decoded?._id);
    if (!user) {
      throw new ApiError(401, "unauthorized request, Invalid access token !");
    }
    req.user = user; // attach user in request
    app.locals.user = user; // attach user in app variables to make available in all files
    next();
  } catch (error) {
    // If error is custom ApiError, rethrow with the same status code and message
    if (error instanceof ApiError) {
      throw new ApiError(401, error?.message);
    } else {
      // If error is not ApiError, assume it's an expired access token
      throw new ApiError(401, "unauthorized request, access token has expired !");
    }
  }
});
