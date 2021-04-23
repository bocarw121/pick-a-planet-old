//  register logic
const handleRegistration = (argon2, transporter, db) => async (req, res) => {
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
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handleRegistration,
};
