require("dotenv").config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3002,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUrl: process.env.MONGO_URL,
  sessionSecret: process.env.SESSION_SECRET,
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
};

if (!config.isTest) {
  if (!config.mongoUrl) {
    // Logger pulls config in, so fall back to stderr for fatal startup errors.
    process.stderr.write("FATAL: MONGO_URL environment variable is not set\n");
    process.exit(1);
  }

  if (!config.sessionSecret) {
    process.stderr.write("FATAL: SESSION_SECRET environment variable is not set\n");
    process.exit(1);
  }
}

module.exports = config;
