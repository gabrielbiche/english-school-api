const { Router } = require('express')

const UserController = require('../controllers/UserController')

const router = Router()

router.post('/users', UserController.create)
router.post('/users/login')
router.delete('/users/:id')

module.exports = router
