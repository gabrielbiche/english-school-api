const express = require('express')
require('dotenv').config()
require('./authentications/authentication')
require('../redis/blacklist')

const router = require('./routes')

const app = express()
const port = 3001

app.use(router)

app.listen(port, () => console.log(`Server is running on port ${port}`))
