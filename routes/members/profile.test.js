const { request } = require('../../__test__/testData/common.data');
const { profileTestUser } = require('../../__test__/testData/users.data');

describe('Test /profile', () => {
  beforeAll(async () => {
    await loadUser(profileTestUser);
  });
  afterAll(() => {
    removeUser(profileTestUser.email);
  });
  describe('GET /profile', () => {
    it('Should render profile page', async (done) => {
      const cookie = await getProfileUserCookie();
      request.get('/profile').set('Cookie', cookie).expect(200, done);
    });
  });
});
