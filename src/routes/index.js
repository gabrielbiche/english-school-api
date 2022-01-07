const express = require('express')

const peopleRoute = require('./peopleRoute')
const levelsRoute = require('./levelsRoute')
const registrationsRoute = require('./registrationsRoute')
const clazzesRoute = require('./clazzesRoute')

const app = express()

app.use(
  express.json(),
  peopleRoute,
  levelsRoute,
  registrationsRoute,
  clazzesRoute
)

module.exports = app
