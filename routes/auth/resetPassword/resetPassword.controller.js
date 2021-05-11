const {
  checkIfUserExists,
  updateUserPasswordByEmail,
} = require("../../../models/user.model");
const { sendResetEmail } = require("../../../services/email");

const getPasswordReset = (req, res) => {
  res.render("reset-password");
};

const resetPassword = async (req, res) => {
  // selects inputed email from database
  const { email } = req.body;

  if (!email) {
    return res.status(401).render("reset-password", {
      message: "Please enter your email to reset your password",
    });
  }

  checkIfUserExists(email, async (err, userExits, noUser) => {
    // Database Error
    if (err.db) {
      return res.render("reset-password", {
        message: "Unable to reset your password at the moment",
      });
    }
    if (noUser) {
      return res.status(401).render("reset-password", {
        message: "The email you entered doesn't match the one on file",
      });
    }
    if (userExits) {
      updateUserPasswordByEmail(email, (dbError, reset) => {
        // Database Error
        if (dbError) {
          return res.status(400).render("reset-password", {
            message: "Unable to reset your password at the moment", //TODO:
          });
        }

        if (reset) {
          // Sends email with the updated password
          if (process.env.NODE_ENV === "production") {
            sendResetEmail(email, reset.update);
          }
          return res.status(200).render("reset-password", {
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
