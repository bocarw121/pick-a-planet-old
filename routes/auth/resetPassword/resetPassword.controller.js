const { NODE_ENV } = require('../../../utils/config');

const { sendResetEmail } = require('../../../services/sendgrid');
const { Users } = require('../../../db/prisma');
const { validationSchema } = require('../../../validation/schemas');

const getPasswordReset = (req, res) => {
  res.render('reset-password');
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const validate = validationSchema.email.validate(email);

  if (validate.error) {
    return res.status(401).render('reset-password', {
      message: 'Please enter a valid email',
    });
  }

  const user = await Users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).render('reset-password', {
      message: 'Email does not exist',
    });
  }

  // Sends email with the updated password
  if (NODE_ENV === 'production') {
    sendResetEmail(email, reset.update);
  }
  return res.status(200).render('reset-password', {
    complete: 'Instructions have been sent to your email',
  });
};

module.exports = {
  getPasswordReset,
  resetPassword,
};
