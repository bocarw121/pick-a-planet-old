const express = require("express");

const {
  getRegistration,
  handleRegistration,
  validateRegistration,
} = require("./register.controller");

const registerRouter = express.Router();

registerRouter.get("/", getRegistration);

registerRouter.post("/", validateRegistration, handleRegistration);

module.exports = registerRouter;
