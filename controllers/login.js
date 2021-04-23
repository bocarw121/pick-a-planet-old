// login logic
const handleLogin = (jwt, argon2, db, JWT) => async (req, res) => {
  const { JWT_COOKIE_EXPIRES, JWT_EXPIRES_IN, JWT_PRIVATE } = JWT;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "You must provide an email and password",
      });
    }
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (error, results) => {
      if (error) {
        res.status(401).render("login", {
          message: "email / password incorrect",
        });
      } // checks to see if results is empty if results is empty no user identified and password attempt fails
      else if (
        results.length == 0 ||
        !(await argon2.verify(results[0].password, password))
      ) {
        res.status(401).render("login", {
          message: "email / password incorrect",
        });
      } // successful login
      else {
        const id = results[0].id;
        // create unique tokens for user
        const token = jwt.sign({ id: id }, JWT_PRIVATE, {
          expiresIn: JWT_EXPIRES_IN,
        });

        const cookieSettings = {
          expires: new Date(
            Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        // Set cookie up in browser

        res.cookie("jwt", token, cookieSettings);

        // status okay redirects user to member page

        res.status(200).redirect("../profile");
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handleLogin,
};