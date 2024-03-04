import ReelServices from "../services/reel.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const getReels = asyncHandler(async (req, res) => {
  const reels = await ReelServices.findReels();
  if (!reels?.length) {
    throw new ApiError(404, "reels does not exists !");
  }
  new ApiResponse(200, { reels }, "reels are fetched successfully").send(res);
});

const getReelById = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const reel = await ReelServices.findReelById(reelId);
  if (!reel) {
    throw new ApiError(404, "reel  not found !");
  }
  new ApiResponse(200, { reel }, "reels are fetched successfully").send(res);
});

const createReel = asyncHandler(async (req, res) => {
  const { caption, isPublic, allowComments, allowSaving } = req.body;
  const userId = req.user?._id;
  const reelVideoFileLocalPath = req.file?.path;
  if (!reelVideoFileLocalPath || !caption?.trim()) {
    throw new ApiError(400, "please upload video and write caption ");
  }
  // upload reel video on cloudinary and get secure_url as videoURL and video duration
  const { secure_url: videoURL, duration } = await uploadOnCloudinary(reelVideoFileLocalPath);
  const createdReel = await ReelServices.createReel({
    owner: userId,
    caption: caption,
    reelVideoFile: videoURL,
    duration,
    isPublic,
    allowComments,
    allowSaving,
  });
  new ApiResponse(201, { reel: createdReel }, "reel has created successfully").send(res);
});

const updateReel = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  const { caption, isPublic, allowComments, allowSaving } = req.body;
  const updatedReel = await ReelServices.updateReel(reelId, {
    caption,
    isPublic,
    allowComments,
    allowSaving,
  });
  new ApiResponse(200, { updatedReel }, "reel has updated successfully").send(res);
});

const deleteReelById = asyncHandler(async (req, res) => {
  const reelId = req.params.id;
  await ReelServices.deleteReel(reelId);
  new ApiResponse(200, {}, "reel has deleted successfully").send(res);
});

export { createReel, deleteReelById, getReels, getReelById, updateReel };
