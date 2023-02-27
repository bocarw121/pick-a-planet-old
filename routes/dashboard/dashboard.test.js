const { request } = require('../../__test__/testData/common.data');
const { profileTestUser } = require('../../__test__/testData/users.data');

describe('GET /', async () => {
  beforeAll(async () => {
    await loadUser(profileTestUser);
  });
  afterAll(() => {
    removeUser(profileTestUser.email);
  });

  describe('GET /dashboard', () => {
    it('Should render dashboard page', async (done) => {
      const cookie = await getProfileUserCookie();
      request.get('/dashboard').set('Cookie', cookie).expect(200, done);
    });
  });
});
