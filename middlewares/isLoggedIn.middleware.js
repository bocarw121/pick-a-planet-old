const { prisma } = require('../db/prisma');

const { verifyToken } = require('../services/security');

// isLogged in
const isLoggedIn = async (req, res, next) => {
  if (req.cookies.userId) {
    // verifies token to locate user id. -- returns an object with user id
    const decoded = await verifyToken(req);

    // check if user still exists

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (user) {
      req.user = user;
      return next();
    }
  } else {
    return next();
  }
};

module.exports = {
  isLoggedIn,
};
