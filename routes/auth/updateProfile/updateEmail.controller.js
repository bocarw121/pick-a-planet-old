const { updateUserEmail, getUserById } = require("../../../models/user.model");
const { verifyToken, removeCookie } = require("../../../services/security");

const getUpdateEmail = (req, res) => {
  if (req.user) {
    res.render("editemail", {
      email: req.user.email,
    });
  } else {
    res.redirect("login");
  }
};

const email = (req, res, next) => {
  res.locals.email = req.user.email;
  next();
};

const validateUpdateEmailForm = (req, res, next) => {
  const { email, emailConfirm } = req.body;
  const currentEmail = req.user.email;

  if (req.cookies.userId) {
    if (!email || !emailConfirm) {
      return res.status(401).render("editemail", {
        message: "You must fill in all fields",
      });
    } else if (!email || !emailConfirm) {
      return res.status(401).render("editemail", {
        message: "Please enter your new email and confirm it!",
      });
    } else if (email !== emailConfirm) {
      return res.status(401).render("editemail", {
        message: "New email doesnt match", //TODO:
      });
    } else if (currentEmail === email) {
      return res.status(401).render("editemail", {
        message: "New email must be different then current", //TODO:
      });
    }
  }
  next();
};

const updateEmail = async (req, res) => {
  const { email } = req.body;
  const currentEmail = req.user.email;

  const decoded = await verifyToken(req);

  getUserById(decoded, (user) => {
    if (err) {
      removeCookie(res);
      res.redirect("login");
    }
    if (user.email !== currentEmail) {
      return res.status(401).render("editemail", {
        message: "The email you entered doesn't match the one on file",
      });
    }

    updateUserEmail(email, decoded, (dbError, result) => {
      if (dbError) {
        return res.render("editemail", {
          message: "Unable to update your email at the moment.",
        });
      }

      if (result) {
        return res.render("editemail", {
          complete: "You're email has been updated succesfuly.",
          email,
        });
      }
    });
  });
};

module.exports = {
  email,
  getUpdateEmail,
  validateUpdateEmailForm,
  updateEmail,
};
