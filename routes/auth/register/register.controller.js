const { NODE_ENV } = require('../../../utils/config');

const {
  sendRegistrationConfirmationEmail,
} = require('../../../services/sendgrid.js');
const { Users } = require('../../../db/prisma');
const { setPassword } = require('../../../services/security');
const capitalize = require('../../../utils/functions');
const { createCustomError } = require('../../../errors/custom-error');
const { StatusCodes } = require('http-status-codes');
const { validationSchema } = require('../../../validation/schemas');

const getRegistration = (req, res) => {
  res.render('register');
};

const validateRegistrationForm = (req, res, next) => {
  const validate = validationSchema.register.validate(req.body);

  if (validate.error) {
    const message = validate.error.details[0].message;

    return res.status(StatusCodes.BAD_REQUEST).render('register', {
      message,
    });
  }

  next();
};

const userCheck = async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).render('register', {
      message: `${email} has already been registered`,
    });
  }

  next();
};

const handleRegistration = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await Users.create({
    data: {
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      email,
      password: await setPassword(password),
    },
  });

  if (!user) {
    return next(
      createCustomError(
        'Unable to register at the moment',
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }

  if (NODE_ENV === 'production') {
    sendRegistrationConfirmationEmail(email, firstName);
  }

  return res.status(StatusCodes.CREATED).render('register', {
    complete: 'User Registered',
  });
};

module.exports = {
  getRegistration,
  userCheck,
  validateRegistrationForm,
  handleRegistration,
};
