const { verifyToken } = require('../../../services/security');
const { prisma } = require('../../../db/prisma');
// isLogged in
const isLoggedIn = async (req, res, next) => {
  console.log('is logged in', req.cookies.userId);
  if (req.cookies.userId) {
    // verifies token to locate user id. -- returns an object with user id
    const decoded = await verifyToken(req);

    // check if user still exists

    const user = await prisma.user.findUnique({
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

const user = (req, res, next) => {
  //TODO: maybe remove and just use req.user
  res.locals.user = req.user;
  next();
};

module.exports = {
  isLoggedIn,
  user,
};
