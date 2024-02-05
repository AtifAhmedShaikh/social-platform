import { findReelById, findReels } from "../services/reel.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ReelModel from "../models/Reel.model.js";

const getReels = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const reels = await findReels(userId);
  if (!reels?.length) {
    throw new ApiError(404, "reels does not exists !");
  }
  const responseInstance = new ApiResponse(200, { reels }, "reels are fetched successfully");
  res.status(200).json(responseInstance);
});

const getReelById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const reelId = req.params.id;
  const reel = await findReelById(reelId, userId);
  if (!reel) {
    throw new ApiError(404, "reels does not exists !");
  }
  const responseInstance = new ApiResponse(200, { reel }, "reels are fetched successfully");
  res.status(200).json(responseInstance);
});

const createReel = asyncHandler(async (req, res) => {
  const { caption, ...reelConfig } = req.body;
  const userId = req.user?._id;
  const reelVideoFileLocalPath = req.file?.path;
  if (!reelVideoFileLocalPath) {
    throw new ApiError(400, "please upload video of reel ");
  }
  const reelVideo = await uploadOnCloudinary(reelVideoFileLocalPath);
  const createdReel = await ReelModel.createReel({
    creator: userId,
    caption: caption,
    reelVideoFile: reelVideo.secure_url,
    ...reelConfig,
  });
  const responseInstance = new ApiResponse(
    201,
    { reel: createdReel },
    "reel has created successfully",
  );
  res.status(200).json(responseInstance);
});

const deleteReelById = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  await ReelModel.findByIdAndDelete(reelId);
  const responseInstance = new ApiResponse(200, "reel has deleted successfully");
  res.status(200).json(responseInstance);
});

export { createReel, deleteReelById, getReels, getReelById };
