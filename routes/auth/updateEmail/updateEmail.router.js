const express = require('express');
const {
  getUpdateEmail,
  validateUpdateEmailForm,
  email,
  updateEmail,
} = require('./updateEmail.controller');
const updateEmailRouter = express.Router();

updateEmailRouter.get('/', getUpdateEmail);

updateEmailRouter.post('/', email, validateUpdateEmailForm, updateEmail);

module.exports = updateEmailRouter;
