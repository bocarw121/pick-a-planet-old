const express = require('express');
const { getProfile, getEditProfile } = require('./profile.controller');

const membersRouter = express.Router();

membersRouter.get('/', getProfile);

membersRouter.get('/edit', getEditProfile);

module.exports = membersRouter;
