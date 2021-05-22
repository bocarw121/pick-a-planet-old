const { request } = require("../../__test__/testData/common.data");
const { planets } = require("../../__test__/testData/planets.data");
const capitalize = require("../../utils/functions");
const { firstTestUser } = require("../../__test__/testData/users.data");

describe("Test Planets", () => {
  beforeAll(async () => {
    await loadUser(firstTestUser);
  });
  afterAll(() => {
    removeUser(firstTestUser.email);
  });
  describe("GET /planets", () => {
    test.each(planets)("It should render (%s page)", async (planet) => {
      const response = await request.get(`/planets/${planet}`).expect(200);

      const planetTitle = `<h1 class="planet-title">${capitalize(planet)}</h1>`;

      expect(response.text).toContain(planetTitle);
    });
  });

  describe("GET /planets with user logged in", () => {
    test.each(planets)(
      "It should display username on (%s page)",
      async (planet) => {
        const cookie = await getFirstUserCookie();

        const response = await request
          .get(`/planets/${planet}`)
          .set("Cookie", cookie)
          .expect(200);

        expect(response.text).toMatch(/Firstuser!/);
      }
    );
  });
});
