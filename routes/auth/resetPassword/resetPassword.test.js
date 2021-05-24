const { request } = require("../../../__test__/testData/common.data");
const { profileTestUser } = require("../../../__test__/testData/users.data");

describe("Test /reset-password", () => {
  describe("GET /reset-password", () => {
    it("Should render /resetpassword", async () => {
      const response = await request.get("/reset-password").expect(200);
    });
  });

  describe("POST /reset-password", () => {
    beforeAll(async () => {
      await loadUser(profileTestUser);
    });
    afterAll(async () => {
      removeUser(profileTestUser.email);

    });
    it("Should respond with status 401 when email field is empty", async () => {
      const response = await request
        .post("/reset-password")
        .send({ email: "" })
        .expect(401);

      expect(response.text).toContain(
        "Please enter your email to reset your password"
      );
    });

    it("Should respond with a status 200", async () => {
      const response = await request
        .post("/reset-password")
        .send({ email: profileTestUser.email })
        .expect(200);

      expect(response.text).toContain(
        "Instructions have been sent to your email"
      );
    });
  });
});
