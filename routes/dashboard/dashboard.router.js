const express = require('express');
const { getDashboardProfile } = require('./dashboard.controller');

const dashboardRouter = express.Router();

dashboardRouter.get('/', getDashboardProfile);

module.exports = dashboardRouter;
