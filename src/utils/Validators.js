const boom = require('@hapi/boom')

const joiValidation = (data, schema) => {
  const { error } = schema.validate(data)
  return error
}

const validateSchemaBody = (schema) => {
  return function (req, res, next) {
    const error = joiValidation(req.body, schema)
    if (error) {
      res.status(boom.badRequest().output.statusCode).json({ message: error.message })
    } else {
      next()
    }
  }
}

const validateSchemaParams = (schema) => {
  return function (req, res, next) {
    const error = joiValidation(req.params, schema)
    if (error) {
      res.status(boom.badRequest().output.statusCode).json({ message: error.message })
    } else {
      next()
    }
  }
}

module.exports = { validateSchemaBody, validateSchemaParams }