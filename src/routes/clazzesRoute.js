const { Router } = require('express')

const ClazzController = require('../controllers/ClazzController')

const router = Router()

router.get('/classes', ClazzController.getAll)
router.get('/classes/:id', ClazzController.getOne)
router.post('/classes', ClazzController.create)
router.put('/classes/:id', ClazzController.update)
router.delete('/classes/:id', ClazzController.delete)

module.exports = router
