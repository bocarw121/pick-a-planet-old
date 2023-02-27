const joi = require('joi');

class ValidationSchemas {
  static get register() {
    return joi.object({
      firstName: joi.string().max(40).required(),
      lastName: joi.string().max(40).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(40).required(),
      passwordConfirm: joi.ref('password'),
    });
  }

  static get login() {
    return joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).max(40).required(),
    });
  }

  static get resetPassword() {
    return joi.object({
      password: joi.string().min(6).max(40).required(),
      passwordConfirm: joi.ref('password'),
    });
  }

  static get email() {
    return joi.object({
      email: joi.string().email().required(),
    });
  }

  static get updateUserInformation() {
    return joi.object({
      firstName: joi.string().max(40).required(),
      lastName: joi.string().max(40).required(),
      email: joi.string().email().required(),
    });
  }
}

module.exports = {
  validationSchema: ValidationSchemas,
};
