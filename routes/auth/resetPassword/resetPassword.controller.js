const argon2 = require("argon2");
const reset = require("../../../util/function");
const {db} = require("../../../util/database");

const { sendResetEmail } = require("../../../util/email");


const getPasswordReset = (req, res) => {
  res.render("resetpassword");
};

const resetPassword =  async (req, res) => {
  // selects inputed email from database

  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (error, results) => {
    if (results.length === 0) {
      res.status(404).render("resetpassword", {
        message: "The email you entered doesn't match the one on file",
      });
    } else {
      // Once email is matched with the database results a query is set to update the password
      const sql = "UPDATE users SET password = ? WHERE email = ?";
      // randomly generate password
      const update = reset();
      let encryptedPassword = await argon2.hash(update);
      db.query(sql, [encryptedPassword, email], (error, results) => {
        if (error) throw error;

        // Sends email with the updated password
      sendResetEmail(email, update)
      });
      res.status(404).render("resetpassword", {
        complete: "Instructions have been sent to your email",
      });
    }
  });
};

module.exports = {
  getPasswordReset,
  resetPassword,
};
