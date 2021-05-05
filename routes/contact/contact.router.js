const express = require("express");
const { contactPage } = require("./contact.controller");
const { handleContact } = require("./contact.controller");

const contactRouter = express.Router();

contactRouter.get("/", contactPage);

contactRouter.post("/", handleContact);

module.exports = contactRouter;
