const { HoldingsModel } = require("../model/HoldingsModel");
const { sendSuccess } = require("../utils/response");

const getHoldings = async (req, res, next) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.user._id }).sort({
      name: 1,
    });

    const totalInvestment = holdings.reduce(
      (sum, h) => sum + h.avg * h.qty,
      0
    );
    const currentValue = holdings.reduce(
      (sum, h) => sum + h.price * h.qty,
      0
    );
    const totalPnl = currentValue - totalInvestment;
    const totalPnlPercent =
      totalInvestment > 0 ? (totalPnl / totalInvestment) * 100 : 0;

    sendSuccess(res, {
      holdings,
      summary: {
        count: holdings.length,
        totalInvestment: parseFloat(totalInvestment.toFixed(2)),
        currentValue: parseFloat(currentValue.toFixed(2)),
        totalPnl: parseFloat(totalPnl.toFixed(2)),
        totalPnlPercent: parseFloat(totalPnlPercent.toFixed(2)),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getHoldings };
