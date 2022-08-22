const express = require('express');
const { getProfile } = require('./profile.controller');

const membersRouter = express.Router();

membersRouter.get('/', getProfile);

module.exports = membersRouter;
