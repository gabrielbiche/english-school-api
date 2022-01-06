const { Router } = require('express')

const RegistrationController = require('../controllers/RegistrationController')

const router = Router()

router.get(
  '/people/:studentId/registration/:registrationId',
  RegistrationController.getARegistration
)
router.get(
  '/people/registration/:classeId',
  RegistrationController.getAllRegistrationsFromOneClazz
)
router.post(
  '/people/:studentId/registration',
  RegistrationController.createRegistration
)
router.put(
  '/people/:studentId/registration/:registrationId/',
  RegistrationController.updateRegistration
)
router.delete(
  '/people/:studentId/registration/:registrationId',
  RegistrationController.deleteRegistration
)

module.exports = router
