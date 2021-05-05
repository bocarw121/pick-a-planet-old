const express = require("express");
const {
  getPasswordReset,
  resetPassword
} = require("./resetPassword.controller");

const resetPasswordRouter = express.Router();

resetPasswordRouter.get("/", getPasswordReset);

resetPasswordRouter.post("/", resetPassword);


module.exports = resetPasswordRouter;
