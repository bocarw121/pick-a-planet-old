const express = require('express');
const { getIndex } = require('./index.controller');

const indexRouter = express.Router();

indexRouter.get('/', getIndex);

module.exports = indexRouter;
