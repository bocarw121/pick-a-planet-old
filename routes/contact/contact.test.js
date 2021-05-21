const { request } = require("../../__test__/testData/common.data");


describe("Test Contact", () => {
  describe("Test GET /contact", () => {
    it("Should render contact form", (done) => {
      request.get("/contact").expect(200, done);
    });
  });

  describe("Test POST /contact", () => {
    it("Should respond with status 400 if form is empty", async () => {
      const response = await request.post("/contact").send({}).expect(400);
    });

    it("Should respond with status 200 if form is filled correctly", async () => {
      const sendMessage = {
        name: "first",
        email: "firstuser@testuser.ca",
        text: "Hey, admin",
      };
      const response = await request
        .post("/contact")
        .send(sendMessage)
        .expect(200);
    });
  });
});
