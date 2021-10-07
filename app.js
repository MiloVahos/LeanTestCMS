const http = require('http')
const express = require('express')
const app = express()
const helment = require('helmet')
const compression = require('compression')
const mainRouter = require('./src/components/MainRouter')
const sequelize = require('./src/config/db')
const { notFoundHandler, errorHandler, wrapErrors } = require('./src/utils/ErrorHandler')

app.use(helment())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('', mainRouter)
app.use(notFoundHandler)
app.use(wrapErrors)
app.use(errorHandler)

const server = http.createServer(app)
sequelize.authenticate().then(() => {
  console.log('Connection to the database has been established successfully');
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`)
  })
}).catch((err) => {
  console.log('Unable to connect to the database:', err);
});