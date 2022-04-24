const express = require('express')
const mysql = require('mysql')
const config = require('./config.json')

const router = express.Router()

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
})
connection.connect()

router.get('/search', async (req, res) => {
  // TODO: Query the DB based on the query params
  res.send('TODO')
})

router.get('/user', async (req, res) => {
  // TODO: Query the DB for the current user (taken from req.session)
})

router.post('/user', async (req, res) => {
  // TODO: Update the DB for the current user
})

router.post('/logout', async (req, res) => {
  req.session.username = null
  res.redirect('/login')
})

router.post('/login', async (req, res, next) => {
  // TODO: Login the user (using PassportJS)
})

router.get('/user/top_artists', async (req, res) => {
  const { username } = req.session.username
  connection.query(`
  WITH userSongs AS (
    SELECT *
    FROM LikesSong
    WHERE username = ${username}
    ), total AS (
    SELECT cb.song_id, cb.artist_id, COUNT(*) as total
    FROM ComposedBy cb INNER JOIN userSongs us ON cb.song_id = us.song_id
    ), likedSongInfo AS (
       SELECT cb.artist_id, cb.song_id, total
       FROM ComposedBy cb JOIN userSongs us ON cb.song_id = us.song_id, total
    ), artistLikedSongInfo AS (
       SELECT cb.song_id, cb.artist_id, COUNT(cb.artist_id) as num_artist
       FROM ComposedBy cb INNER JOIN userSongs us on cb.song_id = us.song_id
       GROUP BY cb.artist_id
    ), artistPercentages AS (
       SELECT DISTINCT lsi.artist_id, alsi.num_artist/lsi.total * 100 as listening_percentage
       FROM likedSongInfo lsi JOIN artistLikedSongInfo alsi ON lsi.artist_id = alsi.artist_id
       ORDER BY listening_percentage DESC
       LIMIT 5
    )
    SELECT ap.listening_percentage AS listening_percentage, a.name AS name, a.location AS location
    FROM artistPercentages ap JOIN Artist a ON ap.artist_id = a.artist_id
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

module.exports = router
