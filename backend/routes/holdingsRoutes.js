const express = require("express");
const { getHoldings } = require("../controllers/holdingsController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, getHoldings);

module.exports = router;
