const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const db = require("../util/database");
const { promisify } = require("util");
const transporter = require("../util/email");
const { JWT } = require("../util/config");
const { handleRegistration } = require("../controllers/register");
const { handleLogin } = require("../controllers/login");
const { handleLogout } = require("../controllers/logout");
const { handleContact } = require("../controllers/contact");
const {
  resetPassword,
  loginAndChangePassword,
} = require("../controllers/reset");
const { updatePassword, updateEmail } = require("../controllers/update");
const { validateRegistration } = require("../controllers/validator");

const router = express.Router();

// Post routes

router.post(
  "/register",
  validateRegistration(db),
  handleRegistration(argon2, transporter, db)
);

router.post("/login", handleLogin(jwt, argon2, db, JWT));

router.post("/editpassword", updatePassword(jwt, promisify, argon2, db, JWT));

router.post("/editemail", updateEmail(jwt, promisify, db, JWT));

router.post("/passwordreset", resetPassword);

router.post("/loginandchange", loginAndChangePassword);

router.post("/contact", handleContact(transporter));

router.get("/logout", handleLogout);

module.exports = router;
