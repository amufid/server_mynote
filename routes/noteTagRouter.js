const express = require('express')
const router = express.Router()
const noteTagController = require('../controllers/noteTagController')

router.post('/', noteTagController.create)
router.put('/:id', noteTagController.update)

module.exports = router;
