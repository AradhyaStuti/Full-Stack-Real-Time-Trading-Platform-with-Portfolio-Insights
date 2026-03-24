const express = require("express");
const { signup, login, logout, getUser } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { authLimiter } = require("../middleware/rateLimiter");
const { signupSchema, loginSchema } = require("../validations/authValidation");

const router = express.Router();

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", requireAuth, logout);
router.get("/user", requireAuth, getUser);

module.exports = router;
