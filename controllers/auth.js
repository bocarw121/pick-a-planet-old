const jwt = require("jsonwebtoken");
const db = require("../util/database");
const argon2 = require("argon2");
const { promisify } = require("util");
const transporter = require("../util/email");
const emailContent = require("../util/emailContent");

//  register logic
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  /*
  Check authValidators for error handling.
  Email does exist and user registration is a success 
  */
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

      transporter.sendMail({
        to: email,
        from: "bocaralhassanwane@gmail.com",
        subject: "Thanks for signing up",
        html: `<h3>Welcome to nine planets</h3>
                  <p>Hey ${firstName},</p>
                <p>Thanks for signing up to the members area. You can enjoy exclusive videos and learn more about the cool planets that surround us.</p>`,
      });
      return res.render("register", {
        complete: "User Registered",
      });
    }
  });
};

// login logic
exports.login = async (req, res) => {
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
        const token = jwt.sign({ id: id }, process.env.JWT_PRIVATE, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const cookieSettings = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
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

// isLogged in
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // verifies token to locate user id. -- returns an object with user id
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_PRIVATE
      );

      // check if user still exists
      const sql = "SELECT * FROM users WHERE id = ?";

      db.query(sql, [decoded.id], (error, results) => {
        if (!results) {
          return next();
        }

        req.user = results[0];
        return next();
      });
    } catch (error) {
      throw error;
      return next();
    }
  } else {
    return next();
  }
};

// logout logic
exports.logout = async (req, res) => {
  // removes cookie if it exists
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  // keeps user on the same page after logout
  res.status(200).redirect("back");
};

exports.loginAndChangePassword = (req, res) => {
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
        const token = jwt.sign({ id: id }, process.env.JWT_PRIVATE, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const cookieSettings = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
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

exports.contact = (req, res) => {
  const { name, email, text } = req.body;
  if ((!name, !email, !text)) {
    res.status(400).render("contact", {
      message: "You must fill in all the fields",
    });
  } else {
    transporter.sendMail({
      to: email,
      from: "bocaralhassanwane@gmail.com",
      subject: `You got a message on nine planets from Email: ${email}`,
      html: `<h4>Hey, ${name}</h4> <br> ${emailContent}`,
    });
    return res.render("contact", {
      complete: "Your email has been sent",
    });
  }
};
