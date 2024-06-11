const express = require('express')
const router = express.Router()
const noteCategoryController = require('../controllers/noteCategoryController')

router.post('/', noteCategoryController.create)
router.put('/:id', noteCategoryController.update)

module.exports = router;
