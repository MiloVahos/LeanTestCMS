const Joi = require('joi')

const userIdSchema = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'Please provide the user id',
  })
});

module.exports = userIdSchema