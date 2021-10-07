const Joi = require('joi')

const updateTaskSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
})

module.exports = updateTaskSchema