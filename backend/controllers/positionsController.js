const { PositionsModel } = require("../model/PositionsModel");
const { sendSuccess } = require("../utils/response");

const getPositions = async (req, res, next) => {
  try {
    const positions = await PositionsModel.find({
      userId: req.user._id,
    }).sort({ name: 1 });

    sendSuccess(res, { positions });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPositions };
