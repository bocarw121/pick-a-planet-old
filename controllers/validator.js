const validateRegistration = (db) => (req, res, next) => {
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

module.exports = {
  validateRegistration,
};
