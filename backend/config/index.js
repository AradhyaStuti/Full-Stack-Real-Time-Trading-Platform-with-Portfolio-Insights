require("dotenv").config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3002,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUrl: process.env.MONGO_URL,
  sessionSecret: process.env.SESSION_SECRET || "test-secret",
  clientUrls: [
    process.env.CLIENT_URL_FRONTEND || "http://localhost:3000",
    process.env.CLIENT_URL_DASHBOARD || "http://localhost:3001",
  ],
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
};

if (!config.isTest) {
  if (!config.mongoUrl) {
    console.error("FATAL: MONGO_URL environment variable is not set");
    process.exit(1);
  }

  if (!config.sessionSecret || config.sessionSecret === "test-secret") {
    console.error("FATAL: SESSION_SECRET environment variable is not set");
    process.exit(1);
  }
}

module.exports = config;
