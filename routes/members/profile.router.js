const express = require('express');
const {
  getProfile,
  getEditProfile,
  validateUserInformation,
  updateUser,
} = require('./profile.controller');

const membersRouter = express.Router();

membersRouter.get('/', getProfile);

membersRouter.get('/edit', getEditProfile);

membersRouter.post('/edit', validateUserInformation, updateUser);

module.exports = membersRouter;
