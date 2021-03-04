const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();

const userInfo = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

router.get("/", authController.isLoggedIn, userInfo, (req, res) => {
  res.render("index");
});

// Route for register
router.get("/register", (req, res) => {
  res.render("register");
});

// Route for login
router.get("/login", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.redirect("profile");
  } else {
    res.render("login");
  }
});

// Route for contact
router.get("/contact", authController.isLoggedIn, userInfo, (req, res) => {
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
router.get("/profile", authController.isLoggedIn, userInfo, (req, res) => {
  if (req.user) {
    res.render("profile");
  } else {
    res.redirect("login");
  }
});

// Route to edit password
router.get("/editpassword", authController.isLoggedIn, userInfo, (req, res) => {
  if (req.user) {
    res.render("editpassword");
  } else {
    res.redirect("login");
  }
});

// Route to edit email
router.get("/editemail", authController.isLoggedIn, userInfo, (req, res) => {
  if (req.user) {
    res.render("editemail");
  } else {
    res.redirect("login");
  }
});

// Route to change password if user clicks link in email sent
router.get(
  "/loginandchange",
  authController.isLoggedIn,
  userInfo,
  (req, res) => {
    if (req.user) {
      res.render("profile");
    } else {
      res.redirect("/");
    }
  }
);

module.exports = router;
