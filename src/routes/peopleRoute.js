const { Router } = require('express')

const PeopleController = require('../controllers/PeopleController')

const router = Router()

router.get('/people/all', PeopleController.getAll)
router.get('/people', PeopleController.getActivePeople)
router.get('/people/:id', PeopleController.getOne)
router.post('/people', PeopleController.create)
router.post('/people/:id', PeopleController.restorePerson)
router.post('/people/:studentId/cancel', PeopleController.cancelPerson)
router.put('/people/:id', PeopleController.update)
router.delete('/people/:id', PeopleController.delete)

module.exports = router
