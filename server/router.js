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

/*
  Determines the top artists for a user relative to the songs that they have liked a
  nd displays the percentage of their liked songs for that artist - COMPLEX
*/
router.get('/user/top-artists', async (req, res) => {
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

// get song info
router.get('/song/song_info', async (req, res) => {
  const { id } = req.query.id
  connection.query(`
    SELECT *
    FROM Song
    WHERE song_id = ${id};
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// For the home page, select random songs from database for users to peruse
router.get('/get-random-songs', async (req, res) => {
  connection.query(`
  SELECT *
  FROM Song
  ORDER BY RAND()
  LIMIT 20
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Queries the database based off the song name and several attributes using sliders
router.get('/search/song', async (req, res) => {
  const song = req.query.song ? req.query.song : ''
  const acousticnessLow = req.query.acousticnessLow ? req.query.acousticnessLow : 0
  const acousticnessHigh = req.query.acousticnessHigh ? req.query.acousticnessHigh : 1
  const danceabilityLow = req.query.danceabilityLow ? req.query.danceabilityLow : 0
  const danceabilityHigh = req.query.danceabilityHigh ? req.query.danceabilityHigh : 1
  const energyLow = req.query.energyLow ? req.query.energyLow : 0
  const energyHigh = req.query.energyHigh ? req.query.energyHigh : 1
  const valenceLow = req.query.valenceLow ? req.query.valenceLow : 0
  const valenceHigh = req.query.valenceHigh ? req.query.valenceHigh : 1
  const livenessLow = req.query.livenessLow ? req.query.livenessLow : 0
  const livenessHigh = req.query.livenessHigh ? req.query.livenessHigh : 1
  const speechinessLow = req.query.speechinessLow ? req.query.speechinessLow : 0
  const speechinessHigh = req.query.speechinessHigh ? req.query.speechinessHigh : 1
  connection.query(`
  SELECT *
  FROM Song JOIN ComposedBy cb ON Song.song_id = cb.song_id
  WHERE artist LIKE '%${song}%' AND acousticness >= ${acousticnessLow} AND 
  acousticness <= ${acousticnessHigh} AND danceability >= ${danceabilityLow} AND 
  danceability <= ${danceabilityHigh} AND energy >= ${energyLow} AND 
  energy <= ${energyHigh} AND valence >= ${valenceLow} AND valence <= ${valenceHigh}AND 
  liveness >= ${livenessLow} AND liveness <= ${livenessHigh} AND 
  speechiness >= ${speechinessLow} ANDspeechiness <= ${speechinessHigh}
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// get related songs based on each individual attribute
router.get('/get-related-songs-attributes', async (req, res) => {
  const { danceability } = req.query.danceability
  const { energy } = req.query.energy
  const { liveness } = req.query.liveness
  const { speechiness } = req.query.speechiness
  connection.query(`
    SELECT title
    FROM Song
    WHERE ABS(danceability - ${danceability}) < 0.1
    UNION
    SELECT title
    FROM Song
    WHERE ABS(energy - ${energy}) < 0.1
    UNION
    SELECT title
    FROM Song
    WHERE ABS(valence - ${valence}) < 0.1
    UNION
    SELECT title
    FROM Song
    WHERE ABS(liveness - ${liveness}) < 0.1
    UNION
    SELECT title
    FROM Song
    WHERE ABS(speechiness - ${speechiness}) < 0.1;
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Queries the database based off of the artist and several attributes using sliders
router.get('/search/artist', async (req, res) => {
  const artist = req.query.artist ? req.query.artist : ''
  const acousticnessLow = req.query.acousticnessLow ? req.query.acousticnessLow : 0
  const acousticnessHigh = req.query.acousticnessHigh ? req.query.acousticnessHigh : 1
  const danceabilityLow = req.query.danceabilityLow ? req.query.danceabilityLow : 0
  const danceabilityHigh = req.query.danceabilityHigh ? req.query.danceabilityHigh : 1
  const energyLow = req.query.energyLow ? req.query.energyLow : 0
  const energyHigh = req.query.energyHigh ? req.query.energyHigh : 1
  const valenceLow = req.query.valenceLow ? req.query.valenceLow : 0
  const valenceHigh = req.query.valenceHigh ? req.query.valenceHigh : 1
  const livenessLow = req.query.livenessLow ? req.query.livenessLow : 0
  const livenessHigh = req.query.livenessHigh ? req.query.livenessHigh : 1
  const speechinessLow = req.query.speechinessLow ? req.query.speechinessLow : 0
  const speechinessHigh = req.query.speechinessHigh ? req.query.speechinessHigh : 1
  connection.query(`
  WITH artistSongs AS (
    SELECT *
    FROM Artist a JOIN ComposedBy cb ON a.artist_id = cb.artist_id
  )
  SELECT s.song_id AS song_id, title, artist, acousticness, danceability, duration_ms, energy, 
  explicit, instrumentalness, liveness, loudness, mode, popularity, speechiness, tempo, valence, year
  FROM Song s JOIN artistSongs artSongs ON s.song_id = artSongs.song_id
  WHERE artSongs.name LIKE '%${artist}%' AND acousticness >= ${acousticnessLow} AND 
  acousticness <= ${acousticnessHigh} AND danceability >= ${danceabilityLow} AND 
  danceability <= ${danceabilityHigh} AND energy >= ${energyLow} AND energy <= ${energyHigh} AND 
  valence >= ${valenceLow} AND valence <= ${valenceHigh} AND liveness >= ${livenessLow} AND 
  liveness <= ${livenessHigh} AND speechiness >= ${speechinessLow} AND 
  speechiness <= ${speechinessHigh}
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// get related songs based on all attributes
router.get('/get-random-songs-allattributes', async (req, res) => {
  const { danceability } = req.query.danceability
  const { energy } = req.query.energy
  const { valence } = req.query.valence
  const { liveness } = req.query.liveness
  const { speechiness } = req.query.speechiness
  connection.query(`
    SELECT title
    FROM Song
    WHERE ABS(danceability - ${danceability}) < 0.3
    AND ABS(energy - ${energy}) < 0.3
    AND ABS(valence - ${valence}) < 0.3
    AND ABS(liveness - ${liveness}) < 0.3
    AND ABS(speechiness - ${speechiness}) < 0.3;
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

module.exports = router
