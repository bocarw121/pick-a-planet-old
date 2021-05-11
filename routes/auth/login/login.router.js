const express = require("express");

const { getLogin, handleLogin } = require("./login.controller");

const loginRouter = express.Router();

loginRouter.get("/", getLogin);

loginRouter.post("/", handleLogin);

module.exports = loginRouter;
