const express = require("express");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");
const enforce = require("express-sslify");
const { port } = require("./util/config");

const app = express();
const db = require("./util/database");
const PORT = port || 8080;
const publicDirectory = path.join(__dirname, "./public");
const mainDirectory = path.join(__dirname, "./");

if (process.env.NODE_ENV === "development") {
  app.get("*", (req, res, next) => {
    res.locals.development = true;
    next();
  });
}

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

app.use(express.static(mainDirectory));
app.use(express.static(publicDirectory));

// initialize cookie parser
app.use(cookieParser());
// handlebars html uses views folder and .hbs extensions
app.set("view engine", "hbs");

// Setting view directories
app.set("views", [
  path.join(__dirname, "./views"),
  path.join(__dirname, "./views/planets"),
  path.join(__dirname, "./views/members-area"),
]);

hbs.registerPartials(path.join(__dirname, "./views/partials"));

//Define Routes coming from /routes/pages
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.use("/planets", require("./routes/planets"));

// Connects to the mysql database
db.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Connected to the database");
  }
});

if (process.env.NODE_ENV === "production") {
  // a load balancer (e.g. Heroku). See further comments below
  app.use(
    enforce.HTTPS({
      trustProtoHeader: true,
    })
  );
}

app.listen(PORT, () => {
  console.log(`Your server is listening on port ${PORT}`);
});
