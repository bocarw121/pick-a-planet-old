const express = require('express');

const indexRouter = require('./index/index.router');
const planetsRouter = require('./planets/planets.router');
const contactRouter = require('./contact/contact.router');
const profileRouter = require('./members/profile.router');
const sourcesRouter = require('./sources/sources.router');
const dashboardRouter = require('./dashboard/dashboard.router');

const router = express.Router();

router.use('/', indexRouter);
router.use('/planets', planetsRouter);
router.use('/contact', contactRouter);
router.use('/profile', profileRouter);
router.use('/dashboard', dashboardRouter);
router.use('/sources', sourcesRouter);

module.exports = router;
