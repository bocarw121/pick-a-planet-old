const { request } = require("../../../__test__/testData/common.data");
const { secondTestUser } = require("../../../__test__/testData/users.data");

describe("Test /logout", () => {
  beforeAll(async () => {
    await loadUser(secondTestUser);
  });

  afterAll(() => {
    removeUser(secondTestUser.email);
  });
  it("Should log user out", async (done) => {
    const cookie = await getSecondUserCookie();
    const response = await request
      .get("/logout")
      .set("Cookie", cookie)
      .expect(302);

    const clearedUserIdCookie = response.headers["set-cookie"][0].split(" ")[0];

    // cookie value is empty
    expect(clearedUserIdCookie).toContain("userId=;");

    done();
  });
});
