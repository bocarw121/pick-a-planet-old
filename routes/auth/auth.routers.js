const express = require("express");

const loginRouter = require("./login/login.router");
const logoutRouter = require("./logout/logout.router");
const registerRouter = require("./register/register.router");
const resetPasswordRouter = require("./resetPassword/resetPassword.router");
const updateProfileRouter = require("./updateProfile/updateProfile.router");


const authRouter = express.Router();


authRouter.use("/", updateProfileRouter);
authRouter.use("/register", registerRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/logout", logoutRouter);
authRouter.use("/resetpassword", resetPasswordRouter);

module.exports = authRouter;
