const config = {
  testEnvironment: 'node',
  testTimeout: 10000,
  verbose: true,
  coverageDirectory: './test/jest-supertest/coverage/my_reports/',
  coverageReporters: ['html', 'text'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: [
    './__test__/testSetup/getCookies.global.js',
    './__test__/testSetup/databaseUsers.global.js',
  ],
};

module.exports = config;
