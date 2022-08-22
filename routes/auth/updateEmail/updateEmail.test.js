const {
  profileTestUser,
  profileTestUserEmail,
} = require('../../../__test__/testData/users.data');
const { request } = require('../../../__test__/testData/common.data');

describe('Test /update-email', () => {
  beforeAll(async () => {
    await loadUser(profileTestUser);
  });
  afterAll(async () => {
    removeUser(profileTestUserEmail.update.email);
  });
  describe('GET /update-email', () => {
    it('Should render update-email page', async (done) => {
      const cookie = await getProfileUserCookie();
      request.get('/update-email').set('Cookie', cookie).expect(200, done);
    });
  });

  describe('Test failed password update', () => {
    it('Should respond with status 401 if email entered is the same as the current email', async () => {
      const cookie = await getProfileUserCookie();
      await request
        .post('/update-email')
        .set('Cookie', cookie)
        .send(profileTestUser.email, profileTestUser.email)
        .expect(401);
    });
  });

  describe('Test successful email update', () => {
    it('Should respond with status 200', async () => {
      const cookie = await getProfileUserCookie();
      const response = await request
        .post('/update-email')
        .set('Cookie', cookie)
        .send(profileTestUserEmail.update)
        .expect(200);

      expect(response.text).toContain('email has been updated succesfuly.');
    });
  });
});
