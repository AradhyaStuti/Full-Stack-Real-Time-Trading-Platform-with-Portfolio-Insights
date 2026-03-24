const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),
  username: Joi.string().trim().alphanum().min(3).max(30).required().messages({
    "string.alphanum": "Username must only contain letters and numbers",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 30 characters",
    "any.required": "Username is required",
  }),
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(128).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 128 characters",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

module.exports = { signupSchema, loginSchema };
