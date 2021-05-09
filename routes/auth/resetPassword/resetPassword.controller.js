const {
  checkIfUserExists,
  updateUserPasswordByEmail,
} = require("../../../models/user.model");
const { sendResetEmail } = require("../../../services/email");

const getPasswordReset = (req, res) => {
  res.render("resetpassword");
};

const resetPassword = async (req, res) => {
  // selects inputed email from database
  const { email } = req.body;

  if (!email) {
    return res.status(401).render("resetpassword", {
      message: "Please enter your email to reset your password",
    });
  }

  checkIfUserExists(email, async (err, userExits, noUser) => {
    // Database Error
    if (err.db) {
      return res.render("resetpassword", {
        message: "Unable to reset your password at the moment",
      });
    }
    if (noUser) {
      return res.status(401).render("resetpassword", {
        message: "The email you entered doesn't match the one on file",
      });
    }
    if (userExits) {
      updateUserPasswordByEmail(email, (dbError, reset) => {
        // Database Error
        if (dbError) {
          return res.status(400).render("resetpassword", {
            message: "Unable to reset your password at the moment", //TODO:
          });
        }

        if (reset) {
          // Once email is matched with the database results a query is set to update the password
          // Sends email with the updated password
          sendResetEmail(email, reset.update);
          return res.status(404).render("resetpassword", {
            complete: "Instructions have been sent to your email",
          });
        }
      });
    }
  });
};

module.exports = {
  getPasswordReset,
  resetPassword,
};
