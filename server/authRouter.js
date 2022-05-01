const express = require('express')
const mysql = require('mysql')
const config = require('./config.json')
const GoogleStrategy = require('passport-google-oidc')

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
  const sql = `SELECT password
  FROM User u
  WHERE u.username = '${username}'`
  connection.query(sql, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      if (results[0].password === password) {
        req.session.username = username
        req.session.save()
        res.send('Successful login')
      } else {
        res.send('Unsuccessful login')
      }
    }
  })
})

router.get('/session', async (req, res) => {
  console.log(req.headers.cookie)
  console.log(req.session.username)
  res.json(req.session)
})

router.post('/logout', async (req, res) => {
  req.session.username = null
})

module.exports = router
