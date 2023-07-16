const passport = require('passport');
const prisma = require('../db/prisma');
const { verifyPassword } = require('../services/security');
const { Strategy } = require('passport-local');

passport.use(
  new Strategy(async function (email, password, cb) {
    try {
      const user = await prisma.Users.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      const verified = await verifyPassword(user, password);

      if (!verified) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      return cb(null, user);
    } catch (error) {
      console.log('error', error);
      return cb(error);
    }
  }),
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  // console.log('id', id);
  try {
    const user = await prisma.Users.findUnique({
      where: {
        id,
      },
    });

    cb(null, user);
  } catch (error) {
    // console.log('error', error.message);
    cb(error);
  }
});

module.exports = { passport: passport };
