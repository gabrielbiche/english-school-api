const express = require('express')

const peopleRoute = require('./peopleRoute')
const levelsRoute = require('./levelsRoute')
const registrationsRoute = require('./registrationsRoute')

const app = express()

app.use(express.json(), peopleRoute, levelsRoute, registrationsRoute)

module.exports = app
