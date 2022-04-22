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

// Artist: Match user to artist based on average attribute values
router.get('/artist/recommended_by_attrs', async (req, res) => {
  const { username } = req.body.username
  connection.query(`
      WITH user_agg_song_attrs AS (
        SELECT 
          AVG(acousticness) AS acousticness, 
          AVG(danceability) AS danceability, 
          AVG(energy) AS energy, 
          AVG(valence) AS valence, 
          AVG(liveness) AS liveness, 
          AVG(speechiness) AS speechiness
        FROM LikesSong l JOIN Song s ON l.song_id = s.song_id
        WHERE l.username = ${username}
        GROUP BY s.song_id
      ), artists_agg_song_attrs AS (
        SELECT 
          artist,
          AVG(acousticness) AS acousticness, 
          AVG(danceability) AS danceability, 
          AVG(energy) AS energy, 
          AVG(valence) AS valence, 
          AVG(liveness) AS liveness, 
          AVG(speechiness) AS speechiness
        FROM ComposedBy c JOIN Song s ON c.song_id = s.song_id
        GROUP BY c.artist_id
      )
      SELECT a.artist
      FROM user_agg_song_attrs u, artists_agg_song_attrs a
      ORDER BY
        ABS(u.acousticness - a.acousticness) +
        ABS(u.danceability - a.danceability) +
        ABS(u.energy - a.energy) +
        ABS(u.valence - a.valence) +
        ABS(u.liveness - a.liveness) +
        ABS(u.speechiness - a.speechiness)
        ASC
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Personal: Average attribute scores
router.get('/personal/attrs', async (req, res) => {
  const { username } = req.body.username
  connection.query(`
      SELECT 
        AVG(acousticness) AS avg_acousticness, 
        AVG(danceability) AS avg_danceability, 
        AVG(energy) AS avg_energy, 
        AVG(valence) AS avg_valence, 
        AVG(liveness) AS avg_liveness, 
        AVG(speechiness) AS avg_speechiness
      FROM LikesSong l JOIN Song s ON l.song_id = s.song_id
      GROUP BY username
      HAVING username = ${username};
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Artist: top songs for an artist by popularity attribute
router.get('/artist/songs_popular', async (req, res) => {
  const { artistId } = req.body
  connection.query(`
      SELECT DISTINCT title
      FROM ComposedBy c JOIN Song s ON c.song_id = s.song_id
      WHERE artist_id = ${artistId}
      ORDER BY popularity DESC;
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Artist: top songs for an artist by likes from users
router.get('/artist/songs_most_liked', async (req, res) => {
  const { artistId } = req.body
  connection.query(`
      WITH song_likes AS (
        SELECT song_id, COUNT(*) AS num_likes
        FROM LikesSong
        GROUP BY song_id
      )
      SELECT DISTINCT title, num_likes
      FROM ComposedBy c JOIN song_likes sl ON c.song_id = sl.song_id
        JOIN Song s ON c.song_id = s.song_id
      WHERE artist_id = ${artistId}
      ORDER BY num_likes DESC
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Song: Recommend songs that were liked by other users in the same geographic location
router.get('/song/recommended_by_location', async (req, res) => {
  const { location } = req.body
  connection.query(`
      WITH song_location_likes AS (
        SELECT location, song_id, COUNT(*) AS num_likes
        FROM LikesSong l JOIN User u ON l.username = u.username
        GROUP BY location, song_id
      )
      SELECT DISTINCT s.song_id, title, num_likes
      FROM song_location_likes l JOIN Song s on l.song_id = s.song_id
      WHERE l.location = ${location}
      ORDER BY num_likes DESC
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

module.exports = router
