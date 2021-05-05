const express = require("express");

const {
  getUpdatePassword,
  getUpdateEmail,
  updateEmail,
  updatePassword,
} = require("./updateProfile.controller");

const updateProfileRouter = express.Router();

updateProfileRouter.get("/editpassword", getUpdatePassword);

updateProfileRouter.get("/editemail", getUpdateEmail);

updateProfileRouter.post("/editpassword", updatePassword);

updateProfileRouter.post("/editemail", updateEmail);

module.exports = updateProfileRouter;
