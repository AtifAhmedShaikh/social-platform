import { createUserReel } from "../services/reel.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
// create reel controller
// get user Id and caption
// get video from multer middleware
const createReel = asyncHandler((req, res) => {
  const reelData = req.body;
  const userId = req.user?._id;
  const reelVideoFileLocalPath = req.file?.path;
  if (!reelVideoFileLocalPath) {
    throw new ApiError(400, "please upload video of reel ");
  }
  const createdReel = createUserReel({ ...reelData, userId, reelVideoFile:reelVideoFileLocalPath });
});

export { createReel };
