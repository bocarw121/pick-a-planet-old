const db = require("../util/database");
const argon2 = require("argon2");
const reset = require("../util/function");
const transporter = require("../util/email");

// password reset logic
exports.passwordReset = async (req, res) => {
  // selects inputed email from database

  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (error, results) => {
    if (results.length === 0) {
      res.status(404).render("passwordreset", {
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
        transporter.sendMail({
          to: email,
          from: "bocaralhassanwane@gmail.com",
          subject: "Pasword request",
          html: `<h3>Here is your temporary password you can click <a href="www.pickaplanet.com/changepassword">here</a> to login and reset your password</h3>
                <p>${update}</p>`,
        });
      });
      res.status(404).render("passwordreset", {
        complete: "Instructions have been sent to your email",
      });
    }
  });
};
