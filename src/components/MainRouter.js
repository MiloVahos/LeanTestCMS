const express = require('express')
const { tokenValidator } = require('../utils/Authorization')

const mainRouter = express()

mainRouter.use('/auth', require('./auth/AuthRouter'))
mainRouter.use(tokenValidator())
mainRouter.use('/task', require('./tasks/TasksRouter'))

module.exports = mainRouter