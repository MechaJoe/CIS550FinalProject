const express = require('express')
const mysql = require('mysql')
const GoogleStrategy = require('passport-google-oidc')
const config = require('./config.json')

const router = express.Router()
const connection = mysql.createConnection({
  host: process.env.RDS_HOST ? process.env.RDS_HOST : config.rds_host,
  user: process.env.RDS_USER ? process.env.RDS_USER : config.rds_user,
  password: process.env.RDS_PASSWORD ? process.env.RDS_PASSWORD : config.rds_password,
  port: process.env.RDS_PORT ? process.env.RDS_PORT : config.rds_port,
  database: process.env.RDS_DB ? process.env.RDS_DB : config.rds_db,
})
connection.connect()

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
  req.session.username = null
  console.log(req.session.username)
  res.send('Logged out')
})

module.exports = router
