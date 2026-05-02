const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trading Platform API",
      version: "1.0.0",
      description:
        "Real-time trading platform REST API with portfolio management, order execution, and market data.",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "/api",
        description: "API Base URL",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0d1" },
            username: { type: "string", example: "johndoe" },
            name: { type: "string", example: "John Doe" },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string", example: "INFY" },
            qty: { type: "integer", example: 5 },
            price: { type: "number", example: 1500.5 },
            mode: { type: "string", enum: ["BUY", "SELL"] },
            status: {
              type: "string",
              enum: ["PENDING", "EXECUTED", "CANCELLED", "FAILED"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Holding: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string", example: "INFY" },
            qty: { type: "integer", example: 10 },
            avg: { type: "number", example: 1400.0 },
            price: { type: "number", example: 1555.45 },
            net: { type: "number", example: 7.14 },
            day: { type: "number", example: 1.2 },
          },
        },
        Position: {
          type: "object",
          properties: {
            id: { type: "string" },
            product: { type: "string", enum: ["CNC", "MIS", "NRML"] },
            name: { type: "string", example: "EVEREADY" },
            qty: { type: "integer", example: 2 },
            avg: { type: "number", example: 316.27 },
            price: { type: "number", example: 312.35 },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                message: { type: "string" },
                details: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        },
        PaginationMeta: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 20 },
            total: { type: "integer", example: 45 },
            totalPages: { type: "integer", example: 3 },
          },
        },
      },
      securitySchemes: {
        sessionAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid",
          description: "Session-based authentication",
        },
      },
    },
  },
  apis: ["./swagger/routes.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
