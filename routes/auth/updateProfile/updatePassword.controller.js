const { verifyToken, verifyPassword } = require("../../../services/security");
const {
  updateUserPasswordById,
  validateUserPassword,
} = require("../../../models/user.model");

const getUpdatePassword = (req, res) => {
  if (req.user) {
    res.render("editpassword");
  } else {
    res.redirect("login");
  }
};

const validatePasswordForm = (req, res, next) => {
  const { password, currentPassword, passwordConfirm } = req.body;
  if (req.cookies.userId) {
    if (!currentPassword || !password || !passwordConfirm) {
      return res.status(400).render("editpassword", {
        message: "You must fill in all fields",
      });
    } else if (!password || !passwordConfirm) {
      return res.status(400).render("editpassword", {
        message: "Please enter your new password and confirm it!",
      });
    } else if (currentPassword === password) {
      return res.status(400).render("editpassword", {
        message: "New password must be a different password!",
      });
    } else if (password.length < 6 || passwordConfirm.length < 6) {
      return res.status(400).render("editpassword", {
        message: "Your password should be at least 6 characters",
      });
    }
  }
  next();
};

const updatePassword = async (req, res) => {
  const { currentPassword, password } = req.body;

  const decoded = await verifyToken(req);
  console.log(decoded);

  validateUserPassword(currentPassword, decoded, (err, { match }) => {
    // DB issue
    if (err) {
      return res.status(400).render("editpassword", {
        message:
          "Sorry, were unable to change your password at the moment, please try again later",
      });
    }
    if (!match) {
      return res.status(401).render("editpassword", {
        message: "The password you entered doesn't match the one on file",
      });
    } else {
      updateUserPasswordById(password, decoded, (error, result) => {
        if (result) {
          return res.render("editpassword", {
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
