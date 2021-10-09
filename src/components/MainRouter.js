const express = require('express')

const mainRouter = express()

mainRouter.use('/auth', require('./auth/AuthRouter'))
mainRouter.use('/task', require('./tasks/TasksRouter'))

module.exports = mainRouter