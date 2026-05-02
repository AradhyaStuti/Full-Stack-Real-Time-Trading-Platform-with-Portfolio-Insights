const { getAgent, createAndLoginUser } = require("./helpers");
const { PositionsModel } = require("../model/PositionsModel");

describe("Positions API", () => {
  describe("GET /api/positions", () => {
    it("should return empty positions for new user", async () => {
      const agent = getAgent();
      await createAndLoginUser(agent);

      const res = await agent.get("/api/positions");

      expect(res.status).toBe(200);
      expect(res.body.data.positions).toEqual([]);
    });

    it("should return user positions", async () => {
      const agent = getAgent();
      const user = await createAndLoginUser(agent);

      await PositionsModel.create({
        userId: user._id,
        product: "CNC",
        name: "EVEREADY",
        qty: 2,
        avg: 316.27,
        price: 312.35,
        net: -1.24,
        day: -1.24,
      });

      const res = await agent.get("/api/positions");

      expect(res.status).toBe(200);
      expect(res.body.data.positions).toHaveLength(1);
      expect(res.body.data.positions[0].name).toBe("EVEREADY");
    });

    it("should isolate positions by user", async () => {
      const agent1 = getAgent();
      const user1 = await createAndLoginUser(agent1, {
        username: "posuser1",
        email: "posuser1@test.com",
      });

      await PositionsModel.create({
        userId: user1._id,
        product: "CNC",
        name: "WIPRO",
        qty: 10,
        avg: 500,
        price: 550,
      });

      const agent2 = getAgent();
      await createAndLoginUser(agent2, {
        username: "posuser2",
        email: "posuser2@test.com",
      });

      const res = await agent2.get("/api/positions");
      expect(res.body.data.positions).toHaveLength(0);
    });

    it("should reject unauthenticated request", async () => {
      const agent = getAgent();
      const res = await agent.get("/api/positions");
      expect(res.status).toBe(401);
    });
  });
});
