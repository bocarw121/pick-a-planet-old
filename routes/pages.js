const { isLoggedIn } = require("../controllers/isLoggedIn");
const express = require("express");

const router = express.Router();

const userInfo = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

router.get("/", isLoggedIn, userInfo, (req, res) => {
  res.render("index");
});

// Route for register
router.get("/register", isLoggedIn, (req, res) => {
  res.render("register");
});

// Route for login
router.get("/login", isLoggedIn, (req, res) => {
  if (req.user) {
    res.redirect("profile");
  } else {
    res.render("login");
  }
});

// Route for contact
router.get("/contact", isLoggedIn, userInfo, (req, res) => {
  res.render("contact");
});

// Route to reset password
router.get("/passwordreset", (req, res) => {
  res.render("passwordreset");
});

// Route for sources
router.get("/sources", (req, res) => {
  res.render("sources");
});

/*     Protected pages         */

// Route for profile
router.get("/profile", isLoggedIn, userInfo, (req, res) => {
  if (req.user) {
    res.render("profile");
  } else {
    res.redirect("login");
  }
});

// Route to edit password
router.get("/editpassword", isLoggedIn, userInfo, (req, res) => {
  if (req.user) {
    res.render("editpassword");
  } else {
    res.redirect("login");
  }
});

// Route to edit email
router.get("/editemail", isLoggedIn, userInfo, (req, res) => {
  if (req.user) {
    res.render("editemail");
  } else {
    res.redirect("login");
  }
});

// Route to change password if user clicks link in email sent
router.get("/loginandchange", isLoggedIn, userInfo, (req, res) => {
  if (req.user) {
    res.render("profile");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
