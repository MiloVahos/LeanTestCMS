const Joi = require('joi')

const authSchema = Joi.object({
  email: Joi.string().trim().email().regex(/^[\w.+\-]+@lean-tech\.io$/).required().messages({
    'string.pattern.base': 'Email must be from Lean Tech',
    'any.required': 'Email is required'
  }),
  password: Joi.string().trim().required().messages({
    'any.required': 'Password is required'
  }),
});

module.exports = authSchema