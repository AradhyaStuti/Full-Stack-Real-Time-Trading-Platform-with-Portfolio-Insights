const { getAgent, createAndLoginUser } = require("./helpers");
const { HoldingsModel } = require("../model/HoldingsModel");

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

    it("should create SELL order when holding covers the qty", async () => {
      const agent = getAgent();
      const user = await createAndLoginUser(agent);

      await HoldingsModel.create({
        userId: user._id,
        name: "TCS",
        qty: 5,
        avg: 3000,
        price: 3200,
      });

      const res = await agent.post("/api/orders").send({
        name: "TCS",
        qty: 3,
        price: 3200,
        mode: "SELL",
      });

      expect(res.status).toBe(201);
      expect(res.body.data.order.mode).toBe("SELL");
    });

    it("should reject SELL when there is no matching holding", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.post("/api/orders").send({
        name: "TCS",
        qty: 3,
        price: 3200,
        mode: "SELL",
      });

      expect(res.status).toBe(400);
    });

    it("should create a holding on first BUY", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      await agent.post("/api/orders").send({
        name: "INFY",
        qty: 5,
        price: 1500,
        mode: "BUY",
      });

      const res = await agent.get("/api/holdings");
      expect(res.body.data.holdings).toHaveLength(1);
      expect(res.body.data.holdings[0].name).toBe("INFY");
      expect(res.body.data.holdings[0].qty).toBe(5);
      expect(res.body.data.holdings[0].avg).toBe(1500);
    });

    it("should update avg cost on a second BUY of the same stock", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      await agent.post("/api/orders").send({ name: "INFY", qty: 10, price: 1400, mode: "BUY" });
      await agent.post("/api/orders").send({ name: "INFY", qty: 5, price: 1700, mode: "BUY" });

      const res = await agent.get("/api/holdings");
      expect(res.body.data.holdings).toHaveLength(1);
      expect(res.body.data.holdings[0].qty).toBe(15);
      // (10*1400 + 5*1700) / 15 = 1500
      expect(res.body.data.holdings[0].avg).toBeCloseTo(1500, 2);
    });

    it("should delete the holding when SELL clears the qty", async () => {
      const agent = getAgent();
      const user = await createAndLoginUser(agent);

      await HoldingsModel.create({
        userId: user._id,
        name: "TCS",
        qty: 3,
        avg: 3000,
        price: 3200,
      });

      await agent.post("/api/orders").send({
        name: "TCS",
        qty: 3,
        price: 3200,
        mode: "SELL",
      });

      const res = await agent.get("/api/holdings");
      expect(res.body.data.holdings).toHaveLength(0);
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
