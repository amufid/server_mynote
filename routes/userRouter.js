const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/', authController.findAll)
router.get('/:id', authController.findOne)
router.put('/:id', authController.update)


module.exports = router
