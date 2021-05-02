const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const hbs = require("hbs");
const enforce = require("express-sslify");

const app = express();

const mainDirectory = path.join(__dirname, "./");


app.set("view engine", "hbs");

app.set("views", [
  path.join(__dirname, "./views"),
  path.join(__dirname, "./views/planets"),
  path.join(__dirname, "./views/members-area"),
]);

hbs.registerPartials(path.join(__dirname, "./views/partials"));

if (process.env.NODE_ENV === "production") {
  app.use(
    enforce.HTTPS({
      trustProtoHeader: true,
    })
  );
}

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


app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.use("/planets", require("./routes/planets"));

module.exports = app;
