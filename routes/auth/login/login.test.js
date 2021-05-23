const { request } = require("../../../__test__/testData/common.data");
const {
  firstTestUser,
  firstUserLogin,
  invalidLogin,
} = require("../../../__test__/testData/users.data");

describe("Test Login", () => {
  describe("GET /login", () => {
    it("Should render login page", (done) => {
      request.get("/login").expect(200, done);
    });
  });

  describe("POST /login", () => {
    beforeAll(async () => {
      await loadUser(firstTestUser);
    });
    afterAll(() => {
      removeUser(firstUserLogin.email);
    });
    it("Should respond with status 401 if fields are missing", async () => {
      const response = await request.post("/login").send({}).expect(401);

      expect(response.text).toContain("You must provide an email and password");
    });

    it("Should respond with status 401 if user login is invalid", async () => {
      const response = await request
        .post("/login")
        .send(invalidLogin)
        .expect(401);

      expect(response.text).toContain("email / password incorrect");
    });

    it("Should respond with status 302 if user login is authenticated and redirected", async () => {
      const response = await request
        .post("/login")
        .send(firstUserLogin)
        .expect(302);

      expect(response.headers.location).toContain("profile");

      expect(response.text).toContain("profile");
    });
  });
});
