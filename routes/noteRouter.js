const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')
const upload = require('../lib/multer')

router.get('/', noteController.findAll)
router.get('/:id', noteController.findOne)
router.post('/', upload.single('file_path'), noteController.create)
router.put('/:id', noteController.update)
router.delete('/:id', noteController.destroy)

module.exports = router;
