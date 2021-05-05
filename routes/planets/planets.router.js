const express = require("express");

const planetsRouter = express.Router();

const {planetRoutes} = require('./planets.controller')
// planets routes

planetsRouter.get("/earth", planetRoutes);

planetsRouter.get("/jupiter", planetRoutes);

planetsRouter.get("/mars", planetRoutes);

planetsRouter.get("/mercury", planetRoutes);

planetsRouter.get("/neptune", planetRoutes);

planetsRouter.get("/pluto", planetRoutes);

planetsRouter.get("/saturn", planetRoutes);

planetsRouter.get("/uranus", planetRoutes);

planetsRouter.get("/venus", planetRoutes);

module.exports = planetsRouter;
