const { request } = require("../../__test__/testData/common.data");


describe("GET /", () => {
  it("Should render index page", (done) => {
    request.get("/").expect(200, done);
  });
});
