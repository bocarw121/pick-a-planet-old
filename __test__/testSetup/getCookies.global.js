const { request } = require('../testData/common.data');
const {
  firstUserLogin,
  profileTestUser,
  secondTestUser,
} = require('../testData/users.data');

// Get cookies to execute tests
global.getFirstUserCookie = async () => {
  const response = await request
    .post('/login')
    .send(firstUserLogin)
    .expect(302);
  const cookie = response.headers['set-cookie'][0];
  return cookie;
};

global.getSecondUserCookie = async () => {
  const response = await request
    .post('/login')
    .send(secondTestUser)
    .expect(302);
  const cookie = response.headers['set-cookie'][0];
  return cookie;
};

global.getProfileUserCookie = async () => {
  const response = await request
    .post('/login')
    .send(profileTestUser)
    .expect(302);
  const cookie = response.headers['set-cookie'][0];
  return cookie;
};
