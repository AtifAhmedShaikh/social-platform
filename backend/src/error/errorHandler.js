import { MODE } from "../config/envConfig.js";

// Global error handling middleware.
const errorHandler = (err, req, res, next) => {
  // Set default status code to 500 if not provided
  err.statusCode = err.statusCode || 500;

  if (MODE !== "PRODUCTION") {
    // Respond with detailed error information in non-production mode
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // Respond with minimal error information in production mode
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};
export default errorHandler;
