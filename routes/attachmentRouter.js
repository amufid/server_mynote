const express = require('express')
const router = express.Router()
const attachmentController = require('../controllers/attachmentController')
const upload = require('../lib/cloudinary')

router.get('/', attachmentController.findAll)
router.get('/:id', attachmentController.findOne)
router.post('/', upload.single('file_path'), attachmentController.create)
router.put('/:id', attachmentController.update)
router.delete('/:id', attachmentController.destroy)

module.exports = router;
