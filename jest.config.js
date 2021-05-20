const config = {
  testEnvironment: "node",
  verbose: true,
  coverageDirectory: "./test/jest-supertest/coverage/my_reports/",
  coverageReporters: ["html", "text"],
  setupFiles: ["dotenv/config"],
};

module.exports = config;
