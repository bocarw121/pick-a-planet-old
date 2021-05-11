const express = require("express");
const {  getSources } = require("./sources.controller");

const sourcesRouter = express.Router();

sourcesRouter.get("/", getSources);

module.exports = sourcesRouter;
