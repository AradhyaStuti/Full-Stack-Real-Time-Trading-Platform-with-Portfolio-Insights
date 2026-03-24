// Sets up environment variables for test runs
process.env.NODE_ENV = "test";
process.env.SESSION_SECRET = "test-secret-key";
process.env.MONGO_URL = "mongodb://localhost:27017/test";
