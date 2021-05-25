const user = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

const development = (req, res, next) => {
  res.locals.development = true;
  next();
};

const production = (req, res, next) => {
  res.locals.production = true;
  next();
};

module.exports = {
  user,
  development,
  production,
};
