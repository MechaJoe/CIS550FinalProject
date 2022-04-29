const express = require('express')
const session = require('express-session')
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const Router = require('./router')

const config = require('./config.json')

const app = express()

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))

app.use(express.json())
// app.use(cookieSession({
//   name: 'session',
//   keys: ['pineapple'],
// }))
app.use(session({
  name: 'session',
  keys: ['username', 'userID'],
  secret: 'mySecret123',
  resave: false,
  saveUnitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', Router)

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
})

module.exports = app
