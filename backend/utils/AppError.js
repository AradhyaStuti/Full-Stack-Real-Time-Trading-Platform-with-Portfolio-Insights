class AppError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400, errors);
    this.name = "ValidationError";
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Not authenticated") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

class AuthorizationError extends AppError {
  constructor(message = "Not authorized") {
    super(message, 403);
    this.name = "AuthorizationError";
  }
}

class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
    this.name = "NotFoundError";
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
};
