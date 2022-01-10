const { Router } = require('express')

const RegistrationController = require('../controllers/RegistrationController')

const router = Router()

router.get(
  '/people/:studentId/registration/:registrationId',
  RegistrationController.getOne
)
router.get(
  '/people/registration/:classeId',
  RegistrationController.getRegistrationsPerClass
)
router.post(
  '/people/:studentId/registration', 
  RegistrationController.create
)
router.put(
  '/people/:studentId/registration/:registrationId/',
  RegistrationController.update
)
router.delete(
  '/people/:studentId/registration/:registrationId',
  RegistrationController.delete
)

module.exports = router
