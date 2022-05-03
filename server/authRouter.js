const express = require('express')
const mysql = require('mysql')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oidc')

const config = require('./config.json')

const connection = mysql.createConnection({
  host: process.env.RDS_HOST ? process.env.RDS_HOST : config.rds_host,
  user: process.env.RDS_USER ? process.env.RDS_USER : config.rds_user,
  password: process.env.RDS_PASSWORD ? process.env.RDS_PASSWORD : config.rds_password,
  port: process.env.RDS_PORT ? process.env.RDS_PORT : config.rds_port,
  database: process.env.RDS_DB ? process.env.RDS_DB : config.rds_db,
})

connection.connect()

const router = express.Router()

router.post('/login', async (req, res) => {
  const { body } = req
  const { username, password } = body
  console.log(username)
  console.log(password)
  const sql = `SELECT password
  FROM User u
  WHERE u.username = '${username}'`
  connection.query(sql, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      if (results.length !== 0 && results[0].password === password) {
        req.session.username = username
        req.session.save()
        console.log(req.session)
        res.send('Successful login')
      } else {
        res.send('Unsuccessful login')
      }
    }
  })
})

router.get('/username', (req, res) => {
  console.log(req.session)
  if (req.session.passport) {
    req.session.username = req.session.passport.user.id
  }
  res.json(req.session.username)
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.username = null
  console.log(req.session.username)
  res.send('Logged out')
})

router.get('/login/federated/google', passport.authenticate('google'))

passport.use(new GoogleStrategy(
  {
    // clientID: process.env.GOOGLE_CLIENT_ID,
    clientID: '628416004124-qmo6n9v38ip6sat09gjq92a7ctghfb2i.apps.googleusercontent.com',
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientSecret: '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',
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile'],
  },
  (async (issuer, profile, cb) => {
    // console.log(profile)
    const username = profile.id
    const exists = await connection.query(
      `SELECT * FROM User WHERE username = '${username}'`,
      (error, results) => (error || !results || results.length === 0),
    )
    if (exists) {
      return cb(null, profile.id)
    }
    return cb(null, profile.id)
  }),
))

router.get(
  '/oauth2/redirect/google',
  (req, res, next) => {
    passport.authenticate(
      'google',
      (err, user) => {
        // console.log(user)
        if (err) {
          req.session.username = user.id
          return res.redirect('http://localhost:3000/signup-google')
        }
        if (user) {
          req.session.username = user.id
          return res.redirect('http://localhost:3000/')
        }
        return res.redirect('http://localhost:3000/login')
      },
    )(req, res, next)
  },
)

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    console.log(user)
    cb(null, { username: user.id })
  })
})

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user))
})

module.exports = router
