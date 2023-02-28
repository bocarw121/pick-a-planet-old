const joi = require('joi');

class ValidationSchemas {
  static get register() {
    return joi.object({
      firstName: joi.string().max(40).required(),
      lastName: joi.string().max(40).required(),
      email: joi.string().email().required().messages({
        'string.empty': 'Email must be a valid email',
      }),
      password: joi.string().min(6).max(40).required().messages({
        'string.empty': 'Password must be at least 6 characters',
      }),
      passwordConfirm: joi
        .string()
        .required()
        .valid(joi.ref('password'))
        .messages({
          'any.only': 'Passwords do not match',
          'string.empty': 'Password must be at least 6 characters',
        }),
    });
  }

  static get login() {
    return joi.object({
      email: joi.string().email().required().messages({
        'string.empty': 'Email must be a valid email',
      }),
      password: joi.string().min(6).max(40).required().messages({
        'string.empty': 'Password must be at least 6 characters',
      }),
    });
  }

  static get resetPassword() {
    return joi.object({
      password: joi.string().min(6).max(40).required().messages({
        'string.empty': 'Password must be at least 6 characters',
        'ref:password': 'Passwords do not match',
      }),
      passwordConfirm: joi.ref('password'),
    });
  }

  static get email() {
    return joi.object({
      email: joi.string().email().required().messages({
        'string.empty': 'Email must be a valid email',
      }),
    });
  }

  static get updateUserInformation() {
    return joi.object({
      firstName: joi.string().max(40).allow(''),
      lastName: joi.string().max(40).allow(''),
      email: joi
        .string()
        .email()
        .min(0)
        .messages({
          'string.empty': 'Email must be a valid email',
        })
        .allow(''),
      emailConfirm: joi.string().required().valid(joi.ref('email')).messages({
        'any.only': 'Emails do not match',
        'string.empty': 'Email must be a valid email',
      }),
    });
  }
}

module.exports = {
  validationSchema: ValidationSchemas,
};
