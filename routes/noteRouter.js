const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')

router.get('/', noteController.findAll)
router.get('/:id', noteController.findOne)
router.post('/', noteController.create)
router.put('/:id', noteController.update)
router.delete('/:id', noteController.destroy)

module.exports = router;
