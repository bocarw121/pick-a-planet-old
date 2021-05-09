const express = require("express");

const {
  getLogin,
  getLoginAndChangePassword,
  handleLogin,

} = require("./login.controller");

const loginRouter = express.Router();

loginRouter.get(["/", "/change"], getLogin, getLoginAndChangePassword);

loginRouter.post(["/", "/change"], handleLogin); 



module.exports = loginRouter;
