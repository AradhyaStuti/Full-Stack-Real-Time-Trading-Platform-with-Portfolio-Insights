const { getAgent, createAndLoginUser } = require("./helpers");

describe("Orders API", () => {
  describe("POST /api/orders", () => {
    it("should create a new order when authenticated", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.post("/api/orders").send({
        name: "INFY",
        qty: 5,
        price: 1500.5,
        mode: "BUY",
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.order.name).toBe("INFY");
      expect(res.body.data.order.qty).toBe(5);
      expect(res.body.data.order.price).toBe(1500.5);
      expect(res.body.data.order.mode).toBe("BUY");
      expect(res.body.data.order.status).toBe("EXECUTED");
    });

    it("should reject unauthenticated order", async () => {
      const agent = getAgent();
      const res = await agent.post("/api/orders").send({
        name: "INFY",
        qty: 5,
        price: 1500.5,
        mode: "BUY",
      });

      expect(res.status).toBe(401);
    });

    it("should reject order with missing fields", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.post("/api/orders").send({
        name: "INFY",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject order with invalid mode", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.post("/api/orders").send({
        name: "INFY",
        qty: 5,
        price: 1500,
        mode: "INVALID",
      });

      expect(res.status).toBe(400);
    });

    it("should reject order with zero quantity", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.post("/api/orders").send({
        name: "INFY",
        qty: 0,
        price: 1500,
        mode: "BUY",
      });

      expect(res.status).toBe(400);
    });

    it("should reject order with negative price", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.post("/api/orders").send({
        name: "INFY",
        qty: 5,
        price: -100,
        mode: "BUY",
      });

      expect(res.status).toBe(400);
    });

    it("should create SELL order", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.post("/api/orders").send({
        name: "TCS",
        qty: 3,
        price: 3200,
        mode: "SELL",
      });

      expect(res.status).toBe(201);
      expect(res.body.data.order.mode).toBe("SELL");
    });
  });

  describe("GET /api/orders", () => {
    it("should return empty orders for new user", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.get("/api/orders");

      expect(res.status).toBe(200);
      expect(res.body.data.orders).toEqual([]);
      expect(res.body.meta.total).toBe(0);
    });

    it("should return user-specific orders", async () => {
      const agent1 = getAgent();
      const user1 = await createAndLoginUser(agent1, {
        username: "user1",
        email: "user1@test.com",
      });

      await agent1.post("/api/orders").send({
        name: "INFY",
        qty: 5,
        price: 1500,
        mode: "BUY",
      });

      const agent2 = getAgent();
      await createAndLoginUser(agent2, {
        username: "user2",
        email: "user2@test.com",
      });

      const res = await agent2.get("/api/orders");
      expect(res.body.data.orders).toHaveLength(0);
    });

    it("should paginate orders", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      for (let i = 0; i < 5; i++) {
        await agent.post("/api/orders").send({
          name: `STOCK${i}`,
          qty: 1,
          price: 100,
          mode: "BUY",
        });
      }

      const res = await agent.get("/api/orders?page=1&limit=2");

      expect(res.status).toBe(200);
      expect(res.body.data.orders).toHaveLength(2);
      expect(res.body.meta.total).toBe(5);
      expect(res.body.meta.totalPages).toBe(3);
    });

    it("should reject unauthenticated request", async () => {
      const agent = getAgent();
      const res = await agent.get("/api/orders");
      expect(res.status).toBe(401);
    });
  });
});
