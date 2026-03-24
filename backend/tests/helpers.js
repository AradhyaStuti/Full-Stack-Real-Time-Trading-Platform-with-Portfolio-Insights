const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const supertest = require("supertest");
const createApp = require("../app");
const { UserModel } = require("../model/UserModel");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

const getApp = () => {
  return createApp();
};

const getAgent = () => {
  const app = getApp();
  return supertest.agent(app);
};

const createTestUser = async (overrides = {}) => {
  const userData = {
    name: "Test User",
    username: "testuser",
    email: "test@example.com",
    ...overrides,
  };

  const user = new UserModel({
    name: userData.name,
    username: userData.username,
    email: userData.email,
  });

  await UserModel.register(user, overrides.password || "password123");
  return user;
};

const loginTestUser = async (agent, credentials = {}) => {
  const res = await agent.post("/api/auth/login").send({
    username: credentials.username || "testuser",
    password: credentials.password || "password123",
  });
  return res;
};

const createAndLoginUser = async (agent, overrides = {}) => {
  const user = await createTestUser(overrides);
  await loginTestUser(agent, {
    username: overrides.username || "testuser",
    password: overrides.password || "password123",
  });
  return user;
};

module.exports = { getApp, getAgent, createTestUser, loginTestUser, createAndLoginUser };
