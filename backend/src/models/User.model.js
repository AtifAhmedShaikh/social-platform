import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/envConfig.js";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
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
      default: "Hi there, i am using social-platform",
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

// encrypt user password before save the document in database
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

// check the  given plainTextPassword from hashed from using bcrypt
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

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
