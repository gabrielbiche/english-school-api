const { Router } = require('express')

const PeopleController = require('../controllers/PeopleController.js')

const router = Router()

router.get('/people/all', PeopleController.getAllPeople)
router.get('/people', PeopleController.getActivePeople)
router.get('/people/:id', PeopleController.getAPerson)
router.get(
  '/people/:studentId/Registrations',
  PeopleController.getAllEnrollmentsFromOnePerson
)
router.post('/people', PeopleController.createPerson)
router.post('/people/:id', PeopleController.restorePerson)
router.post('/people/:studentId/cancel', PeopleController.cancelPerson)
router.put('/people/:id', PeopleController.updatePerson)
router.delete('/people/:id', PeopleController.deletePerson)

module.exports = router
