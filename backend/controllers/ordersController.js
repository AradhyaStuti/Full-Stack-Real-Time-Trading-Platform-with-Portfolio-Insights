const { OrdersModel } = require("../model/OrdersModel");
const { sendSuccess, sendCreated } = require("../utils/response");
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

const createOrder = async (req, res, next) => {
  try {
    const order = await OrdersModel.create({
      userId: req.user._id,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    sendCreated(res, { order });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOrders, createOrder };
