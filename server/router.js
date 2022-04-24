const express = require('express')
const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
})
connection.connect()
const router = express.Router()

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

router.get('/location-score', async (req, res) => {
  const { artist_id } = req.query
  const query = `WITH song_likes AS (
    SELECT song_id, COUNT(*) AS num_likes
    FROM LikesSong
    GROUP BY song_id
  ),
      total_artist_song_likes AS (
      SELECT artist_id, SUM(num_likes) AS num_likes
      FROM ComposedBy c
      JOIN song_likes sl ON c.song_id = sl.song_id
      JOIN Song s ON c.song_id = s.song_id
      WHERE artist_id = ${artist_id}
      GROUP BY artist_id
  )
  SELECT User.location, COUNT(*)/num_likes AS popularity
  FROM User
      JOIN LikesSong ON User.username = LikesSong.username
      JOIN Song ON LikesSong.song_id = Song.song_id
      JOIN ComposedBy ON Song.song_id = ComposedBy.song_id
      JOIN Artist ON ComposedBy.artist_id = Artist.artist_id
      JOIN total_artist_song_likes ON ComposedBy.artist_id = total_artist_song_likes.artist_id
  WHERE Artist.artist_id = ${artist_id}
  GROUP BY User.location, num_likes
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.get('/artist-likes', async (req, res) => {
  const { artist_id } = req.query
  const query = `WITH song_likes AS (
    SELECT song_id, COUNT(*) AS num_likes
    FROM LikesSong
    GROUP BY song_id
  )
  SELECT artist_id, SUM(num_likes) AS num_likes
  FROM ComposedBy c 
  JOIN song_likes sl ON c.song_id = sl.song_id
  JOIN Song s ON c.song_id = s.song_id
  WHERE artist_id = ${artist_id}
  GROUP BY artist_id
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.get('/heatmap', async (req, res) => {
  const query = `SELECT location, artist_id
  FROM Artist
  GROUP BY location;
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.get('/user/likes-list', async (req, res) => {
  const { username } = req.query
  const query = `SELECT DISTINCT title
  FROM LikesSong l JOIN Song s on l.song_id = s.song_id
  WHERE l.username=${username};  
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.get('/user/likes', async (req, res) => {
  const { username } = req.query
  const query = `SELECT COUNT(*) AS num_songs_liked
  FROM LikesSong l JOIN Song s on l.song_id = s.song_id
  WHERE l.username = ${username}
  GROUP BY l.username;
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else if (results) {
      res.json({ results })
    }
  })
})

module.exports = router
