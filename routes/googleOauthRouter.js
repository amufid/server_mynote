const express = require('express')
const router = express.Router();
const passport = require('passport');
const { createToken } = require('../lib/jwt')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
   // Successful authentication
   const accessToken = createToken({ id: req.user.id })
   res.redirect(`http://localhost:5173/google-auth?token=${accessToken}`);
})

module.exports = router;
