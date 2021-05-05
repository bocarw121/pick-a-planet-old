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

module.exports = {
  planetRoutes,
};
