const { request } = require('../../../__test__/testData/common.data');
const {
  profileTestUser,
  profileTestUserPassword,
} = require('../../../__test__/testData/users.data');

describe('Test /update-password', () => {
  beforeAll(async () => {
    await loadUser(profileTestUser);
  });
  afterAll(async () => {
    removeUser(profileTestUser.email);
  });

  describe('Get /update-password', () => {
    it('Should render /update-password', async (done) => {
      const cookie = await getProfileUserCookie();
      await request.get('/update-password').set('Cookie', cookie).expect(200);

      done();
    });
  });

  describe('Test failed password update', () => {
    it('Should respond with status 401 when fields are empty', async () => {
      const cookie = await getProfileUserCookie();
      const response = await request
        .post('/update-password')
        .set('Cookie', cookie)
        .send({})
        .expect(401);

      expect(response.text).toContain('You must fill in all fields');
    });
  });

  describe('Test successful password update', () => {
    it('Should respond with status 200', async () => {
      const cookie = await getProfileUserCookie();
      const response = await request
        .post('/update-password')
        .set('Cookie', cookie)
        .send(profileTestUserPassword.update)
        .expect(200);

      expect(response.text).toContain('password has been changed succesfuly.');
    });
  });
});
