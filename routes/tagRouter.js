const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')

router.get('/', tagController.findAll)
router.get('/:id', tagController.findOne)
router.post('/', tagController.create)
router.put('/:id', tagController.update)
router.delete('/:id', tagController.destroy)

module.exports = router
