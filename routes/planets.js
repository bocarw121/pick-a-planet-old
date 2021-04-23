const { isLoggedIn } = require("../controllers/isLoggedIn");
const express = require("express");
const router = express.Router();

const userInfo = (req, res, next) => {
  res.locals.user = req.user;
  if (req.user) res.locals.name = req.user.firstname;

  next();
};

const planetRoutes = (req, res) => {
  const planets = (req.body.planet = [
    "Earth",
    "Jupiter",
    "Mars",
    "Mercury",
    "Neptune",
    "Pluto",
    "Saturn",
    "Uranus",
    "Venus",
  ]);

  for (let planet of planets) {
    if (req.url === `/${planet.toLowerCase()}`) {
      res.render(`${planet.toLowerCase()}`, { planet });
    }
  }
};

// planets routes

router.get("/earth", isLoggedIn, userInfo, planetRoutes);

router.get("/jupiter", isLoggedIn, userInfo, planetRoutes);

router.get("/mars", isLoggedIn, userInfo, planetRoutes);

router.get("/mercury", isLoggedIn, userInfo, planetRoutes);

router.get("/neptune", isLoggedIn, userInfo, planetRoutes);

router.get("/pluto", isLoggedIn, userInfo, planetRoutes);

router.get("/saturn", isLoggedIn, userInfo, planetRoutes);

router.get("/uranus", isLoggedIn, userInfo, planetRoutes);

router.get("/venus", isLoggedIn, userInfo, planetRoutes);

module.exports = router;
