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

passport.use(new GoogleStrategy(
  {
    // clientID: process.env.GOOGLE_CLIENT_ID,
    clientID: '628416004124-qmo6n9v38ip6sat09gjq92a7ctghfb2i.apps.googleusercontent.com',
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientSecret: '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',
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile'],
  },
  ((issuer, profile, cb) => {
    console.log(profile)
    const username = profile.id
    connection.query(`SELECT * FROM User WHERE username = '${username}'`, (err, user) => {
      if (err) {
        cb(err)
      }
      if (!user) {
        return cb(null, false, { message: 'Create account' })
      }
      return cb(null, user, { message: 'Logged in through Google' })
    })
  }),
))

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
  res.json(req.session.username)
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.username = null
  console.log(req.session.username)
  res.send('Logged out')
})

router.get('/login/federated/google', passport.authenticate('google'))

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/',
  failureRedirect: 'http://localhost:3000/login',
}))

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username, name: user.name })
  })
})

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user))
})

module.exports = router
