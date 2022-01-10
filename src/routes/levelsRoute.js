const { Router } = require('express')

const LevelController = require('../controllers/LevelController')

const router = Router()

router.get('/levels', LevelController.getAll)
router.get('/levels/:id', LevelController.getOne)
router.post('/levels', LevelController.create)
router.put('/levels/:id', LevelController.update)
router.delete('/levels/:id', LevelController.delete)

module.exports = router
