const express = require("express");

const {
  getLogin,
  getLoginAndChangePassword,
  handleLogin,
  loginAndChangePassword,
} = require("./login.controller");

const loginRouter = express.Router();

loginRouter.get("/", getLogin);

loginRouter.get("/change", getLoginAndChangePassword);

loginRouter.post("/", handleLogin); //TODO:remove:

loginRouter.post("/change" / loginAndChangePassword);

module.exports = loginRouter;
