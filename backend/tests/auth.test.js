const { getAgent, createTestUser, createAndLoginUser } = require("./helpers");

describe("Auth API", () => {
  describe("POST /api/auth/signup", () => {
    it("should create a new user", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "securepassword",
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data.user.username).toBe("johndoe");
      expect(res.body.data.user.email).toBe("john@example.com");
    });

    it("should reject duplicate email", async () => {
      await createTestUser({ email: "dup@example.com" });

      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "Another User",
        username: "another",
        email: "dup@example.com",
        password: "securepassword",
      });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });

    it("should reject duplicate username", async () => {
      await createTestUser({ username: "taken" });

      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "Another User",
        username: "taken",
        email: "new@example.com",
        password: "securepassword",
      });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });

    it("should reject short password", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "short",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject invalid email", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "John Doe",
        username: "johndoe",
        email: "notanemail",
        password: "securepassword",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject missing fields", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/signup").send({
        name: "John Doe",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with correct credentials", async () => {
      await createTestUser();
      const agent = getAgent();

      const res = await agent.post("/api/auth/login").send({
        username: "testuser",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.username).toBe("testuser");
    });

    it("should reject wrong password", async () => {
      await createTestUser();
      const agent = getAgent();

      const res = await agent.post("/api/auth/login").send({
        username: "testuser",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should reject non-existent user", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/login").send({
        username: "ghost",
        password: "password123",
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/auth/user", () => {
    it("should return user when authenticated", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.get("/api/auth/user");

      expect(res.status).toBe(200);
      expect(res.body.data.user.username).toBe("testuser");
    });

    it("should reject unauthenticated request", async () => {
      const agent = getAgent();
      const res = await agent.get("/api/auth/user");

      expect(res.status).toBe(401);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should logout authenticated user", async () => {
      const agent = getAgent();
      const user = await createTestUser();

      const loginRes = await agent.post("/api/auth/login").send({
        username: "testuser",
        password: "password123",
      });
      expect(loginRes.status).toBe(200);

      const res = await agent.post("/api/auth/logout");
      expect(res.status).toBe(200);

      const userRes = await agent.get("/api/auth/user");
      expect(userRes.status).toBe(401);
    });

    it("should reject unauthenticated logout", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/auth/logout");
      expect(res.status).toBe(401);
    });
  });
});
