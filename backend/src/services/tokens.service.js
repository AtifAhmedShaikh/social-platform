import TokenModel from "../models/Token.model.js";
import UserModel from "../models/User.model.js";
/**
 * @param {string} userId - current user ID who is login or register
 * Generate access and refresh token using custom  methods of user schema
 * create new document in tokens collection
 * save refresh token with associated this user ID
 * return both tokens for saving in cookies
 */
export const createUserRefreshTokenInDatabase = async userId => {
  const user = await UserModel.findById(userId);
  if (!userId) return null;
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  const createdRefreshToken = await TokenModel.create({
    userId,
    token: refreshToken,
  });
  console.log(createdRefreshToken);
  return { accessToken, refreshToken };
};

// delete user refresh token from database
export const deleteUserRefreshTokenFromDatabase = async userId => {
  return await TokenModel.deleteOne({ userId });
};

export const updateRefreshTokenInDatabase = async (userId, newToken) => {
  const updated = await TokenModel.updateOne(
    { userId },
    { $set: { token: newToken } },
    { new: true },
  );
  return updated;
};
