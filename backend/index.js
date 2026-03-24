require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");
const config = require("./config");
const createApp = require("./app");
const { initializeSocket } = require("./socket");
const logger = require("./utils/logger");

const app = createApp();
const server = http.createServer(app);

// ─── Initialize WebSocket ────────────────────────────────────────────────────
initializeSocket(server);

// ─── Database & Server Start ─────────────────────────────────────────────────
const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    logger.info("Connected to MongoDB");

    server.listen(config.port, () => {
      logger.info(
        `Server running on port ${config.port} in ${config.nodeEnv} mode`
      );
      logger.info(`API docs available at http://localhost:${config.port}/api/docs`);
    });
  } catch (err) {
    logger.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

// ─── Graceful Shutdown ───────────────────────────────────────────────────────
const shutdown = async (signal) => {
  logger.info(`${signal} received, shutting down gracefully`);

  server.close(() => {
    logger.info("HTTP server closed");
  });

  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed");
  } catch (err) {
    logger.error("Error closing MongoDB connection:", err.message);
  }

  process.exit(0);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  logger.warn("Disconnected from MongoDB");
});

startServer();
