const Joi = require('joi')

const createTaskSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required'
  }),
  description: Joi.string().trim().required().messages({
    'any.required': 'Description is required'
  }),
  user_id: Joi.number().integer().positive(),
})

module.exports = createTaskSchema