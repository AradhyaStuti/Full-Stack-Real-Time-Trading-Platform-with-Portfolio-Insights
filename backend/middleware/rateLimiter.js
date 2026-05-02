const rateLimit = require("express-rate-limit");
const config = require("../config");

const isTest = config.isTest;

const noopLimiter = (req, res, next) => next();

const generalLimiter = isTest
  ? noopLimiter
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        error: { message: "Too many requests, please try again later" },
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

const authLimiter = isTest
  ? noopLimiter
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: {
        success: false,
        error: {
          message: "Too many authentication attempts, please try again later",
        },
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

const orderLimiter = isTest
  ? noopLimiter
  : rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 30,
      message: {
        success: false,
        error: { message: "Too many orders, please slow down" },
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

module.exports = { generalLimiter, authLimiter, orderLimiter };
