const express = require("express");

const {
  validatePasswordForm,
  getUpdatePassword,
  updatePassword,
} = require("./updatePassword.controller");

const updatePasswordRouter = express.Router();

updatePasswordRouter.get("/", getUpdatePassword);

updatePasswordRouter.post("/", validatePasswordForm, updatePassword);

module.exports = updatePasswordRouter;
