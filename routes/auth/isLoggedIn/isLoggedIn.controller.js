const { getUserById } = require("../../../models/user.model");
const { verifyToken } = require("../../../services/security");

// isLogged in
const isLoggedIn = async (req, res, next) => {
  if (req.cookies.userId) {
    // verifies token to locate user id. -- returns an object with user id
    const decoded = await verifyToken(req);

    // check if user still exists

    getUserById(decoded, (user) => {
      if (user.id) {
        req.user = user;
        return next();
      }
    });
  } else {
    return next();
  }
};

const user = (req, res, next) => {
  //TODO:
  res.locals.user = req.user;
  next();
};

module.exports = {
  isLoggedIn,
  user,
};
