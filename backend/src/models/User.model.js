import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/envConfig.js";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("aggregate", function (next) {
  this.project({
    password: 0,
    __v: 0,
    updatedAt: 0,
    followers: 0,
    following: 0,
    "posts.__v": 0,
    "posts.likes": 0,
    "posts.comments": 0,
    "posts.followers": 0,
    "posts.following": 0,
    "posts.owner.updatedAt": 0,
    "posts.owner.__v": 0,
    "posts.owner.password": 0,
    "tweets.__v": 0,
    "tweets.likes": 0,
    "tweets.comments": 0,
    "tweets.followers": 0,
    "tweets.following": 0,
    "tweets.owner.updatedAt": 0,
    "tweets.owner.__v": 0,
    "tweets.owner.password": 0,
    "reels.__v": 0,
    "reels.likes": 0,
    "reels.comments": 0,
    "reels.followers": 0,
    "reels.following": 0,
    "reels.owner.updatedAt": 0,
    "reels.owner.__v": 0,
    "reels.owner.password": 0,
  });
  next();
});

// encrypt the user password before save the document in database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    // - convert plain text password into hashed form
    this.password = await bcrypt.hash(this.password, 5);
    next();
  } catch (error) {
    console.log("error while hashing password before save the user document ");
    next();
  }
});

// method to compare provided plain text password with the hashed password by using bcrypt
userSchema.methods.isCorrectPassword = async function (plainTextPassword) {
  try {
    return await bcrypt.compare(plainTextPassword, this.password);
  } catch (error) {
    console.log("error while comparing the password using bcrypt");
    return false;
  }
};

// Generate access Token using JWT for user authentication
userSchema.methods.generateAccessToken = function () {
  try {
    const payload = {
      _id: this._id,
      username: this.username,
    };
    const accessToken = Jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return accessToken;
  } catch (error) {
    console.log("error while generating accessToken !", error);
  }
};

// Generate refresh Token using JWT, to store in database in user document
userSchema.methods.generateRefreshToken = function () {
  try {
    const payload = {
      _id: this._id,
      username: this.username,
    };
    const refreshToken = Jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "10d",
    });
    return refreshToken;
  } catch (error) {
    console.log("error while generating refreshToken !", error);
  }
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
