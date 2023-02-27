const { StatusCodes } = require('http-status-codes');
const { Users } = require('../../../db/prisma');
// const { updateUserEmail, getUserById } = require('../../../models/user.model');
const { verifyToken, removeCookie } = require('../../../services/security');

const getUpdateEmail = (req, res) => {
  if (req.user) {
    res.render('update-email', {
      email: req.user.email,
    });
  } else {
    res.redirect('login');
  }
};

const email = (req, res, next) => {
  res.locals.email = req.user.email;
  next();
};

const validateUpdateEmailForm = (req, res, next) => {
  const { email, emailConfirm } = req.body;
  const currentEmail = req.user.email;

  if (req.cookies.userId) {
    if (!email || !emailConfirm) {
      return res.status(401).render('update-email', {
        message: 'You must fill in all fields',
      });
    } else if (email !== emailConfirm) {
      return res.status(401).render('update-email', {
        message: 'New email doesnt match', //TODO:
      });
    } else if (currentEmail === email) {
      return res.status(401).render('update-email', {
        message: 'New email must be different then current', //TODO:
      });
    }
  }
  next();
};

const updateEmail = async (req, res) => {
  const { email } = req.body;
  // const currentEmail = req.user.email;

  const decoded = await verifyToken(req);

  const user = await Users.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    removeCookie(res);
    res.redirect('login');
  }

  const updatedUser = await Users.update({
    where: {
      id: decoded.id,
    },
    data: {
      email,
    },
  });

  if (updatedUser) {
    return res.status(StatusCodes.OK).render('update-email', {
      // eslint-disable-next-line quotes
      complete: "You're email has been updated succesfuly.",
      email,
    });
  }
};

module.exports = {
  email,
  getUpdateEmail,
  validateUpdateEmailForm,
  updateEmail,
};
