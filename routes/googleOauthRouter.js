const express = require('express')
const router = express.Router();
const passport = require('passport');
const { createToken, createRefreshToken } = require('../lib/jwt')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
   // Successful authentication
   const userId = req.user.id
   const accessToken = createToken({ id: userId })
   const refreshToken = createRefreshToken({ id: userId })

   res.redirect(`http://localhost:5173/google-auth?token=${accessToken}&refreshToken=${refreshToken}`);
})

module.exports = router;
