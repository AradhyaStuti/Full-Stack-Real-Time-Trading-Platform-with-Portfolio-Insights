const express = require("express");
const { getPositions } = require("../controllers/positionsController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, getPositions);

module.exports = router;
