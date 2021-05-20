const { request } = require("../../__test__/testData/common.data");

describe("GET /sources", () => {
  it("Should render sources page", (done) => {
    request.get("/sources").expect(200, done);
  });
});
