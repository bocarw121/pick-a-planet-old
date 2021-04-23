const db = require("../util/database");
const argon2 = require("argon2");
const reset = require("../util/function");
const transporter = require("../util/email");

// password reset logic
const resetPassword = async (req, res) => {
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

const loginAndChangePassword = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("/changepassword", {
        message: "You must provide an email and password",
      });
    }
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (error, results) => {
      if (error) {
        res.status(401).render("loginandchange", {
          message: "email / password incorrect",
        });
      }
      // checks to see if results is empty
      else if (
        results.length === 0 ||
        !(await argon2.verify(results[0].password, password))
      ) {
        res.status(401).render("loginandchange", {
          message: "email / password incorrect",
        });
      } // successful login
      else {
        const id = results[0].id;
        // create unique tokens for user
        const token = jwt.sign({ id: id }, JWT.private, {
          expiresIn: JWT.expiresIn,
        });

        const cookieSettings = {
          expires: new Date(
            Date.now() + JWT.cookieExpires * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        // Set cookie up in browser
        res.cookie("jwt", token, cookieSettings);

        // status okay redirects user to member page

        res.status(200).redirect("../editpassword");
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  resetPassword,
  loginAndChangePassword,
};
