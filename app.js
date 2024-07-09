const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session')
const prisma = require('./lib/prisma')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT
const app = express()

app.use(morgan('dev'))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'refreshToken'],
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  credentials: true
}))

// middleware oauth google 
passport.use(new GoogleStrategy(
  {
    clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
    clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/oauth/google/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile, '<<<<<')
    const username = profile.displayName
    const email = profile.emails

    try {
      let user = await prisma.users.findUnique({
        where: { email: email[0].value }
      })

      if (user) {
        return cb(null, user);
      } else {
        user = await prisma.users.create({
          data: {
            username: username,
            email: email[0].value,
            password: email[0].value,
          }
        })
        return cb(null, user);
      }
    } catch (error) {
      console.log(error)
      return cb(null, error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    secure: false,
    sameSite: 'Strict',
    path: '/'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports = app;
