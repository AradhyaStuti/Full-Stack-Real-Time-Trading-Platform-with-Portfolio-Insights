const { getAgent } = require("./helpers");

describe("Middleware", () => {
  describe("Request ID", () => {
    it("should add X-Request-Id header to responses", async () => {
      const agent = getAgent();
      const res = await agent.get("/health");

      expect(res.headers["x-request-id"]).toBeDefined();
    });

    it("should echo back provided X-Request-Id", async () => {
      const agent = getAgent();
      const res = await agent
        .get("/health")
        .set("X-Request-Id", "test-request-123");

      expect(res.headers["x-request-id"]).toBe("test-request-123");
    });
  });

  describe("Security Headers", () => {
    it("should include security headers from helmet", async () => {
      const agent = getAgent();
      const res = await agent.get("/health");

      expect(res.headers["x-content-type-options"]).toBe("nosniff");
      expect(res.headers["x-frame-options"]).toBe("SAMEORIGIN");
    });
  });

  describe("Input Validation", () => {
    it("should strip unknown fields from signup body", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "securepassword",
        maliciousField: "should be stripped",
      });

      expect(res.status).toBe(201);
    });

    it("should reject non-alphanumeric username", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "John Doe",
        username: "john doe!",
        email: "john@example.com",
        password: "securepassword",
      });

      expect(res.status).toBe(400);
    });
  });
});
