const express = require("express");

const { isLoggedIn, user } = require("./auth/isLoggedIn/isLoggedIn.controller");

// All the routes combined

const indexRouter = require("./main/index.router");
const planetsRouter = require("./planets/planets.router");
const contactRouter = require("./contact/contact.router");

const profileRouter = require("./members/profile.router");
const sourcesRouter = require("./main/sources.router");

const router = express.Router();

router.get("/*", isLoggedIn, user);

router.use("/", indexRouter);
router.use("/profile", profileRouter);
router.use("/contact", contactRouter);
router.use("/planets", planetsRouter);
router.use("/sources", sourcesRouter);

module.exports = router;
