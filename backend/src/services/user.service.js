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
