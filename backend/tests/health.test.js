const { getAgent } = require("./helpers");

describe("Health Check", () => {
  it("should return health status", async () => {
    const agent = getAgent();
    const res = await agent.get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("services");
    expect(res.body).toHaveProperty("memory");
  });
});

describe("404 Handler", () => {
  it("should return 404 for unknown routes", async () => {
    const agent = getAgent();
    const res = await agent.get("/api/nonexistent");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toContain("not found");
  });
});
