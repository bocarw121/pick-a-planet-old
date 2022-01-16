const express = require("express");
const cookieParser = require("cookie-parser");

const router = require("./routes/routers");
const authRouter = require("./routes/auth/auth.routers");
const { hbsConfig } = require("./services/expressHandlebars");
const { mainDirectory, views } = require("./utils/paths");
const { NODE_ENV } = require("./utils/config");
const { isLoggedIn } = require("./middlewares/isLoggedIn.middleware");

const {
  user,
  development,
  production,
} = require("./middlewares/locals.middleware");
const { loggers } = require("./middlewares/logger.middleware");

const app = express();

app.engine("hbs", hbsConfig);

app.set("view engine", "hbs");

app.set("views", views);

// Use loggers only in development and production
if (NODE_ENV === "development" || NODE_ENV === "production") {
  app.use(loggers);
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(mainDirectory));

app.use(cookieParser());

// Add local variables to all views in development
if (NODE_ENV === "development") {
  app.use("*", development);
}

// Add local variables to all views in production
if (NODE_ENV === "production") {
  app.use("*", production);
}

app.use("/", isLoggedIn, user, router);
app.use("/", authRouter);

module.exports = app;
