const passport = require("passport");
const { UserModel } = require("../model/UserModel");
const { sendSuccess, sendCreated, sendError } = require("../utils/response");
const { AppError } = require("../utils/AppError");

const signup = async (req, res, next) => {
  const { username, email, name, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return sendError(res, "Email already registered", 409);
    }

    const user = new UserModel({ username, email, name });
    await UserModel.register(user, password);

    passport.authenticate("local")(req, res, () => {
      sendCreated(res, {
        user: {
          id: req.user._id,
          username: req.user.username,
          name: req.user.name,
          email: req.user.email,
        },
      });
    });
  } catch (err) {
    if (err.name === "UserExistsError") {
      return sendError(res, "Username already taken", 409);
    }
    next(err);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return sendError(res, info?.message || "Invalid credentials", 401);
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      sendSuccess(res, {
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        },
      });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(new AppError("Logout failed", 500));
    sendSuccess(res, { message: "Logged out successfully" });
  });
};

const getUser = (req, res) => {
  sendSuccess(res, {
    user: {
      id: req.user._id,
      username: req.user.username,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

module.exports = { signup, login, logout, getUser };
