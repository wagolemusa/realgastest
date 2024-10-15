import ErrorHandler from "../utils/errorHandler";

// Define the error handling middleware function
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
}; 

// Export the error handling middleware function
export default errorHandler;
