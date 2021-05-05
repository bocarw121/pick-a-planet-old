const express = require("express");

const { handleLogout } = require("./logout.controller");

const logoutRouter = express.Router();

logoutRouter.get("/", handleLogout);

module.exports = logoutRouter;
