const { AuthenticationError } = require("../utils/AppError");

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new AuthenticationError());
};

module.exports = { requireAuth };
