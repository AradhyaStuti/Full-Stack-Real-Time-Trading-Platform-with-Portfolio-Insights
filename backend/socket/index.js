const { Server } = require("socket.io");
const config = require("../config");
const logger = require("../utils/logger");

let io;

const STOCK_SYMBOLS = [
  "INFY", "TCS", "RELIANCE", "HDFCBANK", "WIPRO",
  "ITC", "SBIN", "BHARTIARTL", "ONGC", "M&M",
  "KPITTECH", "QUICKHEAL", "HUL", "TATAPOWER", "HINDUNILVR",
];

const basePrices = {
  INFY: 1555.45, TCS: 3194.80, RELIANCE: 2112.40,
  HDFCBANK: 1522.35, WIPRO: 577.75, ITC: 207.90,
  SBIN: 430.20, BHARTIARTL: 541.15, ONGC: 116.80,
  "M&M": 779.80, KPITTECH: 266.45, QUICKHEAL: 308.55,
  HUL: 512.40, TATAPOWER: 124.15, HINDUNILVR: 2417.40,
};

const currentPrices = { ...basePrices };

const simulatePriceChange = (symbol) => {
  const change = (Math.random() - 0.5) * 2;
  const percentChange = change * 0.005;
  currentPrices[symbol] = parseFloat(
    (currentPrices[symbol] * (1 + percentChange)).toFixed(2)
  );

  const dayChange = (
    ((currentPrices[symbol] - basePrices[symbol]) / basePrices[symbol]) *
    100
  ).toFixed(2);

  return {
    symbol,
    price: currentPrices[symbol],
    change: parseFloat(dayChange),
    timestamp: Date.now(),
  };
};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: config.clientUrls,
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on("connection", (socket) => {
    logger.debug(`Socket connected: ${socket.id}`);

    socket.emit("market:prices", {
      prices: STOCK_SYMBOLS.map((symbol) => ({
        symbol,
        price: currentPrices[symbol],
        change: (
          ((currentPrices[symbol] - basePrices[symbol]) /
            basePrices[symbol]) *
          100
        ).toFixed(2),
      })),
    });

    socket.on("disconnect", (reason) => {
      logger.debug(`Socket disconnected: ${socket.id} (${reason})`);
    });
  });

  const priceInterval = setInterval(() => {
    const updates = STOCK_SYMBOLS.map(simulatePriceChange);
    io.emit("market:update", { prices: updates });
  }, 2000);

  io.on("close", () => {
    clearInterval(priceInterval);
  });

  logger.info("WebSocket server initialized");
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initializeSocket, getIO };
