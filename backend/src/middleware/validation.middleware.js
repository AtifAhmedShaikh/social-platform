import ApiError from "../utils/ApiError.js";

/**
 * middleware to validate the user provided data by using Joi
 * @param {object} schema - validate data based on given schema - {registration}
 * also Ensure avatar and coverImage are uploaded
 * @return {function} If validation error send response to user otherwise control pass the next controller
 */
export const validateData = schema => {
  return (req, res, next) => {
    const { name, username, email, password, bio } = req.body;
    const validate = schema.validate({ name, username, email, password, bio });
    // optionally extract Images local path if user uploaded
    const avatar = req.files?.avatar[0]?.path;
    const coverImage = req.files?.coverImage[0]?.path;
    // check avatar and coverImage are uploaded
    if (!avatar || !coverImage) {
      throw new ApiError(400, "avatar and coverImage are required");
    }
    // Check if validation Error
    if (validate?.error) {
      const validationErrorMessage = validate?.error?.details[0]?.message || "Enter valid data !";
      throw new ApiError(400, validationErrorMessage);
    } else {
      // Attach data and  avatar, coverImage in request
      req.body = validate.value;
      req.avatar = avatar;
      req.coverImage = coverImage;
      console.log("Every thing fine next:");
      return next(); // control pass the next controller
    }
  };
};
