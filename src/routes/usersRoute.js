const { Router } = require('express')

const UserController = require('../controllers/UserController')
const { authenticationMiddleware } = require('../middlewares')

const router = Router()

router.post('/users/signup', UserController.create)
router.post(
  '/users/login',
  authenticationMiddleware.local,
  UserController.login
)
router.get(
  '/users/logout',
  authenticationMiddleware.bearer,
  UserController.logout
)
router.delete(
  '/users/:id',
  authenticationMiddleware.bearer,
  UserController.delete
)

module.exports = router
