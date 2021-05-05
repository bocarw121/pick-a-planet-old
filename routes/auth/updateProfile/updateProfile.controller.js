// Update password
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { promisify } = require("util");
const { JWT } = require("../../../util/config");
const {db} = require("../../../util/database");

const getUpdatePassword = (req, res) => {
  if (req.user) {
    res.render("editpassword");
  } else {
    res.redirect("login");
  }
};

const updatePassword = async (
  req, 
  res
) => {
  const { password, currentPassword, passwordConfirm } = req.body;
  const { JWT_PRIVATE } = JWT;

  const decoded = await promisify(jwt.verify)(req.cookies.jwt, JWT_PRIVATE);
  if (req.cookies.jwt) {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
      async (error, results) => {
        try {
          if (error) throw error;
          // checks to make sure current password is the same as password in the database
          if (
            (!currentPassword && !password && !passwordConfirm) ||
            (currentPassword && !password) ||
            (currentPassword && !passwordConfirm)
          ) {
            
            res.status(400).render("editpassword", {
              message: "You must fill in all fields",
            });
          } else if (!password || !passwordConfirm) {
            res.status(400).render("editpassword", {
              message: "Please enter your new password and confirm it!",
            });
          } else if (currentPassword === password) {
            res.status(400).render("editpassword", {
              message: "New password must be a different password!",
            });
          } else if (password.length < 6 && passwordConfirm.length < 6) {
            res.status(400).render("editpassword", {
              message: "Your password should be at least 6 characters",
            });
          } else if (!(await argon2.verify(results[0].password, password))) {
            res.status(400).render("editpassword", {
              message: "The password you entered doesn't match the one on file",
            });
          } else {
            if (req.cookies.jwt) {
              let encryptedPassword = await argon2.hash(password);
              const sql = "UPDATE users SET password = ? WHERE id = ?";
              db.query(
                sql,
                [encryptedPassword, decoded.id],
                (error, results) => {
                  if (error) {
                    throw error;
                  } else {
                    return res.render("editpassword", {
                      complete: "You're password has been changed succesfuly.",
                    });
                  }
                }
              );
            }
          }
        } catch (error) {
          throw error;
        }
      }
    );
  }
};

const getUpdateEmail = (req, res) => {
  if (req.user) {
    res.render("editemail");
  } else {
    res.redirect("login");
  }
};

// Update email
const updateEmail = async (req, res) => {
  const { JWT_PRIVATE } = JWT;
  const { email, currentEmail, emailConfirm } = req.body;

  const decoded = await promisify(jwt.verify)(req.cookies.jwt, JWT_PRIVATE);
  if (req.cookies.jwt) {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
      async (error, results) => {
        try {
          if (error) throw error;
          // checks to make sure current password is the same as password in the database
          if (
            (!currentEmail && !email && !emailConfirm) ||
            (currentEmail && !email) ||
            (currentEmail && !emailConfirm)
          ) {
            res.status(400).render("editemail", {
              message: "You must fill in all fields",
            });
          } else if (!email || !emailConfirm) {
            res.status(400).render("editemail", {
              message: "Please enter your new email and confirm it!",
            });
          } else if (currentEmail === email) {
            res.status(400).render("editemail", {
              message: "New email must be a different email!",
            });
          } else if (results[0].email !== currentEmail) {
            res.status(400).render("editemail", {
              message: "The email you entered doesn't match the one on file",
            });
          } else {
            if (req.cookies.jwt) {
              const sql = "UPDATE users SET email = ? WHERE id = ?";
              db.query(sql, [email, decoded.id], (error, results) => {
                if (error) {
                  throw error;
                } else {
                  return res.render("editemail", {
                    complete: "You're email has been updated succesfuly.",
                  });
                }
              });
            }
          }
        } catch (error) {
          throw error;
        }
      }
    );
  }
};

module.exports = {
  getUpdatePassword,
  updatePassword,
  getUpdateEmail,
  updateEmail,
};
