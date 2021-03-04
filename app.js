const express = require("express");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// const enforce = require("express-sslify");

// loading .env file content into processenv
dotenv.config({ path: "./.env" });

const app = express();

// a load balancer (e.g. Heroku). See further comments below
// app.use(
//   enforce.HTTPS({
//     trustProtoHeader: true,
//   })
// );

// database connection
const db = require("./util/database");

hbs.registerPartials(path.join(__dirname, "./views/partials"));

// for css, hbs and js files in the front end
app.set("views", [
  path.join(__dirname, "./"),
  path.join(__dirname, "./views"),
  path.join(__dirname, "./views/planets"),
  path.join(__dirname, "./views/members-area"),
]);

const publicDirectory = path.join(__dirname, "./public");
const mainDirectory = path.join(__dirname, "./");

app.use(express.static(mainDirectory));
app.use(express.static(publicDirectory));

// handlebars html uses views folder and .hbs extensions
app.set("view engine", "hbs");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// initialize cookie parser
app.use(cookieParser());

// Connects to the mysql database
db.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Connected to the database");
  }
});

//Define Routes coming from /routes/pages
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.use("/planets", require("./routes/planets"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Your server is listening on port ${PORT}`);
});
