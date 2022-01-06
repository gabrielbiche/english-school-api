const express = require('express')

const peopleRoute = require('./peopleRoute')

const app = express()

app.use(express.json(), peopleRoute)

module.exports = app
