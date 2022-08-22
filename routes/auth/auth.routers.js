const express = require('express');

const loginRouter = require('./login/login.router');
const logoutRouter = require('./logout/logout.router');
const registerRouter = require('./register/register.router');
const resetPasswordRouter = require('./resetPassword/resetPassword.router');
const updateEmailRouter = require('./updateEmail/updateEmail.router');
const updatePasswordRouter = require('./updatePassword/updatePassword.router');

const authRouter = express.Router();

authRouter.use('/register', registerRouter);
authRouter.use('/login', loginRouter);
authRouter.use('/logout', logoutRouter);
authRouter.use('/update-email', updateEmailRouter);
authRouter.use('/update-password', updatePasswordRouter);
authRouter.use('/reset-password', resetPasswordRouter);

module.exports = authRouter;
