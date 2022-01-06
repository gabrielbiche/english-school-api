const express = require('express')

const peopleRoute = require('./peopleRoute')
const levelsRoute = require('./levelsRoute')

const app = express()

app.use(express.json(), peopleRoute, levelsRoute)

module.exports = app
