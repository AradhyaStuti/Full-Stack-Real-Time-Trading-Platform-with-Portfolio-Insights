const Joi = require("joi");

const createOrderSchema = Joi.object({
  name: Joi.string().trim().uppercase().min(1).max(20).required().messages({
    "string.min": "Stock name is required",
    "string.max": "Stock name cannot exceed 20 characters",
    "any.required": "Stock name is required",
  }),
  qty: Joi.number().integer().min(1).max(10000).required().messages({
    "number.min": "Quantity must be at least 1",
    "number.max": "Quantity cannot exceed 10,000",
    "any.required": "Quantity is required",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.positive": "Price must be positive",
    "any.required": "Price is required",
  }),
  mode: Joi.string().uppercase().valid("BUY", "SELL").required().messages({
    "any.only": "Mode must be BUY or SELL",
    "any.required": "Order mode is required",
  }),
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  sortBy: Joi.string().valid("createdAt", "name", "price").default("createdAt"),
  order: Joi.string().valid("asc", "desc").default("desc"),
});

module.exports = { createOrderSchema, paginationSchema };
