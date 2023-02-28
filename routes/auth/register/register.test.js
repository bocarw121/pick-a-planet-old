const { request } = require('../../../__test__/testData/common.data');

const {
  registerTestUser,
  registerTestUser2,
  passwordNotMatch,
} = require('../../../__test__/testData/users.data');

jest.mock("@prisma/client")

describe('Test Register', () => {
  beforeAll(async () => {
    await loadUser(registerTestUser);
  });
  afterAll(async () => {
    removeUser(registerTestUser.email);
    removeUser(registerTestUser2.email);
  });
  describe('GET /register', () => {
    it('Should render registration page', (done) => {
      request.get('/register').expect(200, done);
    });
  });

  describe('Test failed Registration ', () => {
    // invalid login and existing user
    it('Should respond with a status 400 if fields are missing', async () => {
      const response = await request.post('/register').send({}).expect(400);

      // expect(response.text).toContain('You must fill out all fields');
    });

    it('Should respond with status 400 if passwords do not match', async () => {
      const response = await request
        .post('/register')
        .send(passwordNotMatch)
        .expect(400);

      expect(response.text).toContain('Passwords do not match');
    });

    it('Should respond with status 400 if user exists.', async () => {
      const response = await request
        .post('/register')
        .send(registerTestUser)
        .expect(400);

      expect(response.text).toContain(
        `${registerTestUser.email} has already been registered`, //TODO:
      );
    });
  });

  describe('Test successful Registration.', () => {
    it('Should respond with 201 created', async () => {
      const response = await request
        .post('/register')
        .send(registerTestUser2)
        .expect(201);

      expect(response.text).toContain('User Registered');
    });
  });
});
