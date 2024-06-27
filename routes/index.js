const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const googleOauthRouter = require('./googleOauthRouter')
const userRouter = require('./userRouter')
const noteRouter = require('./noteRouter')
const categoryRouter = require('./categoryRouter')
const tagRouter = require('./tagRouter')
const noteTagRouter = require('./noteTagRouter')
const noteCategoryRouter = require('./noteCategoryRouter')
const attachmentRouter = require('./attachmentRouter')
const authentication = require('../middlewares/auth')

// public routes 
router.use('/api/auth', authRouter)
router.use('/api/oauth', googleOauthRouter)

// private routes 
router.use('/api/users', authentication, userRouter)
router.use('/api/notes', authentication, noteRouter)
router.use('/api/categories', authentication, categoryRouter)
router.use('/api/tags', authentication, tagRouter)
router.use('/api/note_tags', authentication, noteTagRouter)
router.use('/api/note_categories', authentication, noteCategoryRouter)
router.use('/api/attachments', authentication, attachmentRouter)

module.exports = router
