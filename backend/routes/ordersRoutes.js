const express = require("express");
const { getOrders, createOrder } = require("../controllers/ordersController");
const { requireAuth } = require("../middleware/auth");
const { validate, validateQuery } = require("../middleware/validate");
const { orderLimiter } = require("../middleware/rateLimiter");
const {
  createOrderSchema,
  paginationSchema,
} = require("../validations/orderValidation");

const router = express.Router();

router.get("/", requireAuth, validateQuery(paginationSchema), getOrders);
router.post("/", requireAuth, orderLimiter, validate(createOrderSchema), createOrder);

module.exports = router;
