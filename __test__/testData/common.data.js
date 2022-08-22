const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

// Export out supertest with express app passed in

module.exports = {
  request,
};
