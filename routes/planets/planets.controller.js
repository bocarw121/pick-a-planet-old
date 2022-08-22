const planetRoutes = (req, res) => {
  const firstName = req.user ? req.user.firstName : null;
  const planets = (req.body.planet = [
    'Earth',
    'Jupiter',
    'Mars',
    'Mercury',
    'Neptune',
    'Pluto',
    'Saturn',
    'Uranus',
    'Venus',
  ]);

  for (let planet of planets) {
    if (req.url === `/${planet.toLowerCase()}`) {
      res.render(`${planet.toLowerCase()}`, { planet, name: firstName });
    }
  }
};

module.exports = {
  planetRoutes,
};
