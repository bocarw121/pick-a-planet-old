const db = require("../util/database");
const { promisify } = require("util");
const { JWT } = require("../util/config");
const jwt = require("jsonwebtoken");
// isLogged in
const isLoggedIn = async (req, res, next) => {
  const { JWT_PRIVATE } = JWT;
  if (req.cookies.jwt) {
    try {
      // verifies token to locate user id. -- returns an object with user id
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, JWT_PRIVATE);

      // check if user still exists
      const sql = "SELECT * FROM users WHERE id = ?";

      db.query(sql, [decoded.id], (error, results) => {
        if (!results) {
          return next();
        }

        req.user = results[0];
        return next();
      });
    } catch (error) {
      throw error;
      return next();
    }
  } else {
    return next();
  }
};

module.exports = {
  isLoggedIn,
};
