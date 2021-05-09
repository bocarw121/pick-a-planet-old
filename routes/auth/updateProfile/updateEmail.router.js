const express = require("express");
const {
  getUpdateEmail,
  validateUpdateEmailForm,
  email,
  updateEmail,
} = require("./updateEmail.controller");
const { isLoggedIn } = require("../isLoggedIn/isLoggedIn.controller");
const updateEmailRouter = express.Router();

updateEmailRouter.get("/", getUpdateEmail);

updateEmailRouter.post(
  "/",
  email,
  isLoggedIn,
  validateUpdateEmailForm,
  updateEmail
);

module.exports = updateEmailRouter;
