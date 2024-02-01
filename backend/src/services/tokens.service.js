import TokenModel from "../models/Token.model.js";
import UserModel from "../models/User.model.js";
/**
 * Generate access and refresh token for given user Id
 * Checks if a refresh token already exists in the database for the user.
 * If a token exists, it updates the existing token, otherwise it creates a new one.
 */

export const generateAccessAndRefreshToken = async userId => {
  const user = await UserModel.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  // Check if a refresh token already exists for the user
  const existedToken = await TokenModel.findOne({ userId });
  if (existedToken) {
    // Update the existing refresh token in the database
    await TokenModel.updateOne({ userId }, { token: refreshToken });
  } else {
    // Create a new entry for the refresh token in the database
    await TokenModel.create({
      userId,
      token: refreshToken,
    });
  }
  return { accessToken, refreshToken };
};

// Delete the refresh token associated with the provided user ID
export const deleteRefreshTokenFromDatabase = async userId => {
  const deletionResult = await TokenModel.deleteOne({ userId });
  // Return true if the refresh token is successfully deleted, false otherwise
  return deletionResult.deletedCount > 0;
};
