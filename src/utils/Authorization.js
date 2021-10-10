const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const validateUserRole = (rolesList) => {
  return function (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.decode(token)
      if (!rolesList.includes(decodedToken.role)) {
        res.status(boom.unauthorized().output.statusCode).json({ message: 'Unauthorized' })
      }
      next()
    } else {
      res.status(boom.unauthorized().output.statusCode).json({ message: 'Unauthorized' })
    }
  }
}

const tokenValidator = () => {
  return function (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1]
      try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        next()
      } catch (e) {
        res.status(boom.unauthorized().output.statusCode).json({ message: 'Unauthorized' })
      }
    } else {
      res.status(boom.unauthorized().output.statusCode).json({ message: 'Unauthorized' })
    }
  }
}

module.exports = { validateUserRole, tokenValidator }