const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { sendSuccess, sendCreated, sendError } = require("../utils/response");
const config = require("../config");

const getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(
      parseInt(req.query.limit) || config.pagination.defaultLimit,
      config.pagination.maxLimit
    );
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const [orders, total] = await Promise.all([
      OrdersModel.find({ userId: req.user._id })
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit),
      OrdersModel.countDocuments({ userId: req.user._id }),
    ]);

    sendSuccess(res, { orders }, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

const applyBuy = async (userId, name, qty, price) => {
  const existing = await HoldingsModel.findOne({ userId, name });
  if (!existing) {
    return HoldingsModel.create({ userId, name, qty, avg: price, price });
  }
  const newQty = existing.qty + qty;
  existing.avg = (existing.avg * existing.qty + price * qty) / newQty;
  existing.qty = newQty;
  existing.price = price;
  return existing.save();
};

const applySell = async (userId, name, qty, price) => {
  const existing = await HoldingsModel.findOne({ userId, name });
  existing.qty -= qty;
  if (existing.qty === 0) {
    return existing.deleteOne();
  }
  existing.price = price;
  return existing.save();
};

const createOrder = async (req, res, next) => {
  try {
    const { name, qty, price, mode } = req.body;
    const userId = req.user._id;

    if (mode === "SELL") {
      const existing = await HoldingsModel.findOne({ userId, name });
      if (!existing || existing.qty < qty) {
        return sendError(res, `Not enough ${name} to sell`, 400);
      }
    }

    const order = await OrdersModel.create({ userId, name, qty, price, mode });

    if (mode === "BUY") {
      await applyBuy(userId, name, qty, price);
    } else {
      await applySell(userId, name, qty, price);
    }

    sendCreated(res, { order });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOrders, createOrder };
