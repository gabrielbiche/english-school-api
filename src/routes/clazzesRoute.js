const { Router } = require('express')

const ClazzController = require('../controllers/ClazzController')

const router = Router()

router.get('/classes', ClazzController.getAllClazzes)
router.get('/classes/:id', ClazzController.getOneClazz)
router.post('/classes', ClazzController.createClazz)
router.put('/classes/:id', ClazzController.updateClazz)
router.delete('/classes/:id', ClazzController.deleteClazz)

module.exports = router
