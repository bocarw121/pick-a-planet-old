const { verifyToken, verifyPassword } = require("../../../services/security");
const {
  updateUserPasswordById,
  validateUserPassword,
} = require("../../../models/user.model");

const getUpdatePassword = (req, res) => {
  if (req.user) {
    res.render("update-password");
  } else {
    res.redirect("login");
  }
};

const validatePasswordForm = (req, res, next) => {
  const { password, currentPassword, passwordConfirm } = req.body;
  if (req.cookies.userId) {
    if (!currentPassword || !password || !passwordConfirm) {
      return res.status(401).render("update-password", {
        message: "You must fill in all fields",
      });
    } else if (!password || !passwordConfirm) {
      return res.status(401).render("update-password", {
        message: "Please enter your new password and confirm it!",
      });
    } else if (currentPassword === passwordConfirm) {
      return res.status(401).render("update-password", {
        message: "New password must be a different password!",
      });
    } else if (password !== passwordConfirm) {
      return res.status(401).render("update-password", {
        message: "Passwords do not match",
      });
    } else if (password.length < 6 || passwordConfirm.length < 6) {
      return res.status(401).render("update-password", {
        message: "Your password should be at least 6 characters",
      });
    }
  }
  next();
};

const updatePassword = async (req, res) => {
  const { currentPassword, password } = req.body;

  const decoded = await verifyToken(req);

  validateUserPassword(currentPassword, decoded, (err, { validated }) => {
    // DB issue
    if (err) {
      return res.status(500).render("update-password", {
        message:
          "Sorry, were unable to change your password at the moment, please try again later",
      });
    }
    if (!validated) {
      return res.status(401).render("update-password", {
        message: "The password you entered doesn't match the one on file",
      });
    } else {
      updateUserPasswordById(password, decoded, (error, result) => {
        if (result) {
          return res.render("update-password", {
            complete: "You're password has been changed succesfuly.",
          });
        }
      });
    }
  });
};

module.exports = {
  validatePasswordForm,
  getUpdatePassword,
  updatePassword,
};
