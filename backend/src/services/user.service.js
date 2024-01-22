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

export const findUserAndUpdate = async (condition, updatedDetails) => {
  return await UserModel.findOneAndUpdate(condition, updatedDetails, { new: true });
};
