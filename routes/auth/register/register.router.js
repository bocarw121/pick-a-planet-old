const express = require("express");

const {
  getRegistration,
  handleRegistration,
  validateRegistrationForm,
  userCheck,
} = require("./register.controller");

const registerRouter = express.Router();

registerRouter.get("/", getRegistration);

registerRouter.post(
  "/",
  validateRegistrationForm,
  userCheck,
  handleRegistration
);

module.exports = registerRouter;
