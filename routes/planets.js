const authController = require("../controllers/auth");
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

router.get("/earth", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/jupiter", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/mars", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/mercury", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/neptune", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/pluto", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/saturn", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/uranus", authController.isLoggedIn, userInfo, planetRoutes);

router.get("/venus", authController.isLoggedIn, userInfo, planetRoutes);

module.exports = router;
