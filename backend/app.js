const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");

const config = require("./config");
const { UserModel } = require("./model/UserModel");
const { generalLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const { requestId } = require("./middleware/requestId");
const logger = require("./utils/logger");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/config");

const authRoutes = require("./routes/authRoutes");
const holdingsRoutes = require("./routes/holdingsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const positionsRoutes = require("./routes/positionsRoutes");

const createApp = () => {
  const app = express();

  app.use(requestId);

  app.use(helmet());
  app.use(
    cors({
      origin: config.clientUrls,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: false }));

  if (config.nodeEnv !== "test") {
    const morganFormat = config.isProduction ? "combined" : "dev";
    app.use(
      morgan(morganFormat, {
        stream: { write: (msg) => logger.http(msg.trim()) },
      })
    );
  }

  app.use(generalLimiter);

  app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: config.isProduction,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(UserModel.createStrategy());
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());

  app.get("/health", (req, res) => {
    const mongoState = require("mongoose").connection.readyState;
    const stateMap = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };

    res.json({
      status: mongoState === 1 ? "ok" : "degraded",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: {
        database: stateMap[mongoState] || "unknown",
      },
      memory: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB",
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
      },
    });
  });

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Trading Platform API Docs",
  }));
  app.get("/api/docs.json", (req, res) => {
    res.json(swaggerSpec);
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/holdings", holdingsRoutes);
  app.use("/api/orders", ordersRoutes);
  app.use("/api/positions", positionsRoutes);

  app.all("*", (req, res) => {
    res.status(404).json({
      success: false,
      error: { message: `Route ${req.originalUrl} not found` },
    });
  });

  app.use(errorHandler);

  return app;
};

module.exports = createApp;
