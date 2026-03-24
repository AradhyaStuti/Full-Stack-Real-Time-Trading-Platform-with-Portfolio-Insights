const { getAgent, createAndLoginUser } = require("./helpers");
const { HoldingsModel } = require("../model/HoldingsModel");

describe("Holdings API", () => {
  describe("GET /api/holdings", () => {
    it("should return empty holdings for new user", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.get("/api/holdings");

      expect(res.status).toBe(200);
      expect(res.body.data.holdings).toEqual([]);
      expect(res.body.data.summary.count).toBe(0);
      expect(res.body.data.summary.totalInvestment).toBe(0);
      expect(res.body.data.summary.currentValue).toBe(0);
      expect(res.body.data.summary.totalPnl).toBe(0);
    });

    it("should return holdings with correct summary", async () => {
      const agent = getAgent();
      const user = await createAndLoginUser(agent);

      await HoldingsModel.create([
        { userId: user._id, name: "INFY", qty: 10, avg: 1400, price: 1500, net: 7.14, day: 1.2 },
        { userId: user._id, name: "TCS", qty: 5, avg: 3000, price: 3200, net: 6.67, day: -0.5 },
      ]);

      const res = await agent.get("/api/holdings");

      expect(res.status).toBe(200);
      expect(res.body.data.holdings).toHaveLength(2);

      const summary = res.body.data.summary;
      expect(summary.count).toBe(2);
      expect(summary.totalInvestment).toBe(29000);
      expect(summary.currentValue).toBe(31000);
      expect(summary.totalPnl).toBe(2000);
      expect(summary.totalPnlPercent).toBeCloseTo(6.9, 1);
    });

    it("should only return holdings for authenticated user", async () => {
      const agent1 = getAgent();
      const user1 = await createAndLoginUser(agent1, {
        username: "holder1",
        email: "holder1@test.com",
      });

      await HoldingsModel.create({
        userId: user1._id,
        name: "RELIANCE",
        qty: 2,
        avg: 2200,
        price: 2400,
      });

      const agent2 = getAgent();
      await createAndLoginUser(agent2, {
        username: "holder2",
        email: "holder2@test.com",
      });

      const res = await agent2.get("/api/holdings");
      expect(res.body.data.holdings).toHaveLength(0);
    });

    it("should reject unauthenticated request", async () => {
      const agent = getAgent();
      const res = await agent.get("/api/holdings");
      expect(res.status).toBe(401);
    });
  });
});
