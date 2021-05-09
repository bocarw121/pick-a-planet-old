const { addUser, checkIfUserExists } = require("../../../models/user.model");

const {
  sendRegistrationConfirmationEmail,
} = require("../../../services/email.js");

const getRegistration = (req, res) => {
  res.render("register");
};

const validateRegistrationForm = (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  if (!password || !email || !firstName || !lastName) {
    return res.status(401).render("register", {
      message: "You must fill out all fields",
    });
  } else if (password.length < 6) {
    return res.status(401).render("register", {
      message: "Your password should be at least 6 characters",
    });
  } else if (password !== passwordConfirm) {
    return res.status(401).render("register", {
      message: "Passwords do not match",
    });
  }
  next();
};

const userCheck = (req, res, next) => {
  const { email } = req.body;

  checkIfUserExists(email, (err, results, userNew) => {
    if (err) {
      return res.status(400).render("register", {
        message: "Unable to register at the moment",
      });
    }
    if (results.id) {
      return res.status(401).render("register", {
        message: `${email} has already been registered`,
      });
    } else if (userNew.newUser) {
      next();
    }
  });
};

const handleRegistration = async (req, res, next) => {
  const { firstName, email } = req.body;

  addUser(req.body, (dbError) => {
    if (dbError) {
      return res.status(400).render("register", {
        message: "Unable to register at the moment",
      });
    } else {
      sendRegistrationConfirmationEmail(email, firstName);
      return res.status(201).render("register", {
        complete: "User Registered",
      });
    }
  });
};

module.exports = {
  getRegistration,
  userCheck,
  validateRegistrationForm,
  checkIfUserExists,
  handleRegistration,
};
