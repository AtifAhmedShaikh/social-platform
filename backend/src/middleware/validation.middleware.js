import ApiError from "../utils/ApiError.js";

/**
 * middleware to validate the user provided data by using Joi
 * @param {object} schema - validate data based on given schema - {registration}
 * also Ensure avatar and coverImage are uploaded
 * @return {function} If validation error send response to user otherwise control pass the next controller
 */
export const validateData = schema => {
  return (req, res, next) => {
    const validate = schema.validate(req.body);
    // Check if validation Error
    if (validate?.error) {
      const validationErrorMessage = validate?.error?.details[0]?.message || "Enter valid data !";
      throw new ApiError(400, validationErrorMessage);
    } else {
      // Attach data in request
      req.body = validate.value;
      return next(); // control pass the next controller
    }
  };
};
