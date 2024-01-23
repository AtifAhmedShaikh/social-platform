import UserModel from "../models/User.model.js";

export const createUser = async userData => {
  const user = new UserModel({
    ...userData,
  });
  return await user.save();
};

export const findUserById = async userId => {
  return UserModel.findById(userId);
};

export const findUsers = async () => {
  return UserModel.find({}, { __v: 0 });
};

// check user has already exists in database, his match by username or email
export const isUserExists = async (username, email) => {
  return await UserModel.findOne({
    $or: [{ username, email }],
  });
};

export const findUserAndUpdate = async (condition, updatedDetails) => {
  return await UserModel.findOneAndUpdate(condition, updatedDetails, { new: true });
};
