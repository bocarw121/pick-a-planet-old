const express = require("express");

const loginRouter = require("./login/login.router");
const logoutRouter = require("./logout/logout.router");
const registerRouter = require("./register/register.router");
const resetPasswordRouter = require("./resetPassword/resetPassword.router");
const updateEmailRouter = require("./updateProfile/updateEmail.router");
const updatePasswordRouter = require("./updateProfile/updatePassword.router");

const authRouter = express.Router();

authRouter.use("/register", registerRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/logout", logoutRouter);
authRouter.use("/editemail", updateEmailRouter);
authRouter.use("/editpassword", updatePasswordRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/resetpassword", resetPasswordRouter);

module.exports = authRouter;
