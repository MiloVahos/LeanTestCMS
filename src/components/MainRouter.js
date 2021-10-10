const express = require('express')
const { tokenValidator } = require('../utils/Authorization')
const { auditLogger } = require('../utils/audit/auditLogger')

const mainRouter = express()

mainRouter.use('/auth', require('./auth/AuthRouter'))
mainRouter.use(tokenValidator())
mainRouter.use(auditLogger())
mainRouter.use('/task', require('./tasks/TasksRouter'))

module.exports = mainRouter