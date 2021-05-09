const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const hbs = require("hbs");

const {
  isLoggedIn,
  user,
} = require("./routes/auth/isLoggedIn/isLoggedIn.controller");
const router = require("./routes/routers");

const authRouter = require("./routes/auth/auth.routers");

const app = express();

const mainDirectory = path.join(__dirname, "./");

hbs.registerPartials(path.join(__dirname, "./views/partials"));

app.set("view engine", "hbs");

app.set("views", [
  path.join(__dirname, "./views"),
  path.join(__dirname, "./views/planets"),
  path.join(__dirname, "./views/members-area"),
]);

app.use(morgan("combined"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(mainDirectory));

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.get("*", (req, res, next) => {
    res.locals.development = true;
    next();
  });
}

app.use("/", isLoggedIn, user, router);
app.use("/", authRouter);

module.exports = app;
