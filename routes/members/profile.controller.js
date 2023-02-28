const { StatusCodes } = require('http-status-codes');

// const { updateUserEmail, getUserById } = require('../../../models/user.model');
const { verifyToken, removeCookie } = require('../../services/security');
const { validationSchema } = require('../../validation/schemas');
const { Users } = require('../../db/prisma');
const capitalize = require('../../utils/functions');

const getProfile = (req, res) => {
  if (req.user) {
    res.render('profile', {
      year: new Date().getFullYear(),
      title: 'Profile',
      user: req.user,
      isProfile: true,
    });
  } else {
    res.redirect('login');
  }
};

const getEditProfile = (req, res) => {
  if (req.user) {
    res.render('edit', {
      // todo add more data
      email: req.user.email,
      year: new Date().getFullYear(),
      title: 'Edit Profile',
      isEdit: true,
    });
  } else {
    res.redirect('login');
  }
};

const validateUserInformation = (req, res, next) => {
  const { email } = req.body;
  const currentEmail = req.user.email;

  try {
    const validate = validationSchema.updateUserInformation.validate(req.body);

    // const type = value.error.details[0].type;
    // Were returning json instead of rendering the page with the error message
    if (req.cookies.userId) {
      if (validate.error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: validate.error.details[0].message,
          success: false,
        });
      }

      if (currentEmail === email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'New email must be different then current',
          success: false,
        });
      }
    }

    next();
  } catch (error) {
    console.log('error', error);
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  // const currentEmail = req.user.email;

  // console.log('req.body', req.body);

  const decoded = await verifyToken(req);

  const user = await Users.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    removeCookie(res);
    return res.redirect('login');
  }

  // update only the fields that are not empty

  if (firstName) {
    user.firstName = firstName;
  }

  if (lastName) {
    user.lastName = lastName;
  }

  if (email) {
    user.email = email;
  }

  const updatedUser = await Users.update({
    where: {
      id: decoded.id,
    },
    data: {
      firstName: capitalize(user.firstName),
      lastName: capitalize(user.lastName),
      email: user.email,
    },
  });

  if (updatedUser) {
    return res.status(StatusCodes.OK).json({
      message: 'Your information has been updated successfully ',
      success: true,
    });
  }
};

module.exports = {
  getProfile,
  getEditProfile,
  updateUser,
  validateUserInformation,
};
