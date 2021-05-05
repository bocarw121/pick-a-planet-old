const { db } = require("../../../util/database");
const argon2 = require("argon2");
const { sendRegistrationConfirmationEmail } = require("../../../util/email");

//  register logic
const getRegistration = (req, res) => {
  res.render("register");
};

const validateRegistration = (req, res, next) => {
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

  const sql = "SELECT email FROM users WHERE email = ?";
  db.query(sql, [email], (error, results) => {
    if (error) throw error;
    // Checks if email exists
    if (results.length > 0) {
      return res.status(401).render("register", {
        message: `${email} has already been registered`,
      });
    } else {
      next();
    }
  });
};

const handleRegistration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  /*
  Check authValidators for error handling.
  Email does exist and user registration is a success 
  */
  try {
    let encryptedPassword = await argon2.hash(password);

    const sql = "INSERT INTO users SET ?";
    const values = {
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    };
    db.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      } else {
        // Sends Welcome email to user

        sendRegistrationConfirmationEmail(email, firstName);
        return res.render("register", {
          complete: "User Registered",
        });
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRegistration,
  validateRegistration,
  handleRegistration,
};
