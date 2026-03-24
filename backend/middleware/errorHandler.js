const { AppError } = require("../utils/AppError");
const { sendError } = require("../utils/response");
const config = require("../config");

const handleCastError = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateKey = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(`${field} already exists`, 409);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);
  return new AppError("Validation failed", 400, errors);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message, stack: err.stack };

  if (err.name === "CastError") error = handleCastError(err);
  if (err.code === 11000) error = handleDuplicateKey(err);
  if (err.name === "ValidationError" && err.errors) error = handleValidationError(err);

  if (error instanceof AppError || err instanceof AppError) {
    const appError = error instanceof AppError ? error : err;
    return sendError(res, appError.message, appError.statusCode, appError.errors);
  }

  console.error("Unhandled error:", err);

  return sendError(
    res,
    config.isProduction ? "Internal server error" : err.message,
    500
  );
};

module.exports = errorHandler;
