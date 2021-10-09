const { Router } = require('express')
const { validateSchemaBody } = require('../../utils/Validators')
const { catchErrors } = require('../../utils/ErrorHandler')
const { authUser } = require('./controllers/AuthController')
const authSchema = require('./schemas/authSchema')

const router = Router()

router.post(
  '',
  validateSchemaBody(authSchema),
  catchErrors(authUser)
)

module.exports = router