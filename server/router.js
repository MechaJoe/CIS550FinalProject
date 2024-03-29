const express = require('express')
const mysql = require('mysql2')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oidc')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const crypto = require('node:crypto')
const config = require('./config.json')

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.RDS_HOST ? process.env.RDS_HOST : config.rds_host,
  user: process.env.RDS_USER ? process.env.RDS_USER : config.rds_user,
  password: process.env.RDS_PASSWORD ? process.env.RDS_PASSWORD : config.rds_password,
  port: process.env.RDS_PORT ? process.env.RDS_PORT : config.rds_port,
  database: process.env.RDS_DB ? process.env.RDS_DB : config.rds_db,
})

const router = express.Router()

// TEMP FIX FOR SESSION PROBLEM
// let session

// AUTH ROUTES
// router.post('/login', async (req, res) => {
//   const { body } = req
//   const { username, password } = body
//   console.log(username)
//   console.log(password)
//   const sql = `SELECT password
//   FROM User u
//   WHERE u.username = '${username}'`
//   connection.query(sql, (error, results) => {
//     if (error) {
//       res.json({ error })
//     } else if (results) {
//       if (results.length !== 0 && results[0].password === password) {
//         req.

// .username = username
//         req.session.save()
//         session = req.session
//         // console.log(req.session)
//         res.send('Successful login')
//       } else {
//         res.send('Unsuccessful login')
//       }
//     }
//   })
// })

// router.get('/username', (req, res) => {
//   console.log(req.session)
//   // res.json(req.session.username)
//   res.json(req.session.username)
// })

// router.post('/logout', (req, res) => {
//   req.session.username = null
//   console.log(req.session.username)
//   res.send('Logged out')
// })

/* USER ROUTES */
// Determines the top artists for a user relative to the songs that they have liked
// and displays the percentage of their liked songs for that artist - COMPLEX
router.get('/user/top-artists', async (req, res) => {
  const { username } = req.session
  connection.query(`
  WITH userSongs AS (
    SELECT *
    FROM LikesSong
    WHERE username = '${username}'
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

// Personal: Average attribute scores
router.get('/user/stats', async (req, res) => {
  const { username } = req.session
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
      HAVING username = '${username}';
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.get('/user/likes-list', async (req, res) => {
  const { username } = req.session
  const query = `SELECT DISTINCT s.song_id, title, artist
  FROM LikesSong l JOIN Song s on l.song_id = s.song_id
  WHERE l.username='${username}';
  `
  connection.query(query, (error, results, _fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else {
      res.json({ results })
    }
  })
})

router.get('/user/num-likes', async (req, res) => {
  const { username } = req.session
  const query = `SELECT COUNT(*) AS num_songs_liked
  FROM LikesSong l JOIN Song s on l.song_id = s.song_id
  WHERE l.username = '${username}'
  GROUP BY l.username;
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else {
      res.json({ results })
    }
  })
})

router.post('/user/set-location', async (req, res) => {
  const { username } = req.session
  const { location } = req.body
  connection.query(`
    UPDATE User SET location = '${location}' WHERE username = '${username}'
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.get('/user/location', async (req, res) => {
  const { username } = req.session
  connection.query(`
    SELECT location
    FROM User
    WHERE username = '${username}'
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.get('/user/count-by-location', async (req, res) => {
  const query = `
    SELECT location, COUNT(username) AS num_users
    FROM User
    GROUP BY location;
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else {
      res.json({ results })
    }
  })
})

router.post('/like', async (req, res) => {
  const { username } = req.session
  const { song_id } = req.body
  connection.query(`
    INSERT INTO LikesSong VALUES ('${username}', '${song_id}');
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

router.post('/unlike', (req, res) => {
  const { username } = req.session
  console.log(username)
  console.log('unlike')
  const { song_id } = req.body
  console.log(song_id)
  connection.query(`
    DELETE FROM LikesSong WHERE username = '${username}' AND song_id = '${song_id}';
  `, (error, results) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

/* SONG ROUTES */
// For the home page, select random songs from database for users to peruse
router.get('/song/get-random', async (req, res) => {
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

// get song info
router.get('/song/info', async (req, res) => {
  const { id } = req.query
  connection.query(`
    SELECT *
    FROM Song
    WHERE song_id = '${id}';
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// get related songs based on each individual attribute
router.get('/song/by-related-attributes', async (req, res) => {
  const {
    danceability, energy, liveness, speechiness, valence,
  } = req.query
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

// get related songs based on all attributes
router.get('/song/by-related-all-attributes', async (req, res) => {
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

// Song: Recommend songs that were liked by other users in the same geographic location
router.get('/song/recommended-by-location', async (req, res) => {
  const { location } = req.session
  connection.query(`
      WITH song_location_likes AS (
        SELECT location, song_id, COUNT(*) AS num_likes
        FROM LikesSong l JOIN User u ON l.username = u.username
        GROUP BY location, song_id
      )
      SELECT DISTINCT s.song_id, title, num_likes
      FROM song_location_likes l JOIN Song s on l.song_id = s.song_id
      WHERE l.location = '${location}'
      ORDER BY num_likes DESC
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

/* ARTIST ROUTES */
// get artist info
router.get('/artist/info', async (req, res) => {
  const { id } = req.query
  connection.query(`
    SELECT *
    FROM Artist
    WHERE artist_id = '${id}';
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Artist: Match user to artist based on average attribute values
router.get('/artist/recommended-by-attrs', async (req, res) => {
  const { username } = req.session
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
        WHERE l.username = '${username}'
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

router.get('/artist/location-score', async (req, res) => {
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
      WHERE artist_id = '${artist_id}'
      GROUP BY artist_id
  )
  SELECT User.location, COUNT(*)/num_likes AS popularity
  FROM User
      JOIN LikesSong ON User.username = LikesSong.username
      JOIN Song ON LikesSong.song_id = Song.song_id
      JOIN ComposedBy ON Song.song_id = ComposedBy.song_id
      JOIN Artist ON ComposedBy.artist_id = Artist.artist_id
      JOIN total_artist_song_likes ON ComposedBy.artist_id = total_artist_song_likes.artist_id
  WHERE Artist.artist_id = '${artist_id}'
  GROUP BY User.location, num_likes
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else {
      res.json({ results })
    }
  })
})

router.get('/artist/num-likes', async (req, res) => {
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
  WHERE artist_id = '${artist_id}'
  GROUP BY artist_id
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    }
  })
})

router.get('/artist/count-by-location', async (req, res) => {
  const query = `SELECT location, COUNT(artist_id) AS num_artists
  FROM Artist
  GROUP BY location;
  `
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else {
      res.json({ results })
    }
  })
})

// Artist: top songs for an artist by popularity attribute
router.get('/artist/songs-popular', async (req, res) => {
  const { artistId } = req.query
  connection.query(`
      SELECT DISTINCT title
      FROM ComposedBy c JOIN Song s ON c.song_id = s.song_id
      WHERE artist_id = '${artistId}'
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
router.get('/artist/songs-most-liked', async (req, res) => {
  const { artistId } = req.query
  connection.query(`
      WITH song_likes AS (
        SELECT song_id, COUNT(*) AS num_likes
        FROM LikesSong
        GROUP BY song_id
      )
      SELECT DISTINCT title, num_likes
      FROM ComposedBy c JOIN song_likes sl ON c.song_id = sl.song_id
        JOIN Song s ON c.song_id = s.song_id
      WHERE artist_id = '${artistId}'
      ORDER BY num_likes DESC
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

// Artist: Recommend artists that were liked by other users in the same geographic location - COMPLEX
router.get('/artist/recommended-by-location', async (req, res) => {
  const { location } = req.session
  connection.query(`
    WITH song_location_likes AS (
      SELECT location, song_id, COUNT(*) AS num_likes
      FROM LikesSong l JOIN User u ON l.username = u.username
      GROUP BY location, song_id
    ), artist_location_likes AS (
      SELECT artist_id, location, SUM(num_likes) AS num_likes
    FROM song_location_likes l JOIN ComposedBy c ON l.song_id = c.song_id
    GROUP BY artist_id, location
    )
    SELECT artist_id
    FROM artist_location_likes
    WHERE p.location = ${location}
    ORDER BY num_likes DESC
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

/* SEARCH ROUTES */
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
  FROM Song JOIN ComposedBy cb ON Song.song_id = cb.song_id JOIN Artist ON cb.artist_id = Artist.artist_id AND Artist.name = Song.artist
  WHERE title LIKE '%${song}%' AND acousticness >= ${acousticnessLow} AND 
  acousticness <= ${acousticnessHigh} AND danceability >= ${danceabilityLow} AND 
  danceability <= ${danceabilityHigh} AND energy >= ${energyLow} AND 
  energy <= ${energyHigh} AND valence >= ${valenceLow} AND valence <= ${valenceHigh} AND 
  liveness >= ${livenessLow} AND liveness <= ${livenessHigh} AND 
  speechiness >= ${speechinessLow} AND speechiness <= ${speechinessHigh}
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
    SELECT cb.artist_id, cb.song_id, a.name, a.location, a.listeners, a.scrobbles, a.ambiguous_artist, 
    a.tags, a.genre
    FROM Artist a JOIN ComposedBy cb ON a.artist_id = cb.artist_id
  ), songsByArtists AS (
    SELECT s.song_id AS song_id
    FROM Song s JOIN artistSongs artSongs ON s.song_id = artSongs.song_id AND artSongs.name = s.artist
    WHERE artSongs.name LIKE '%${artist}%' AND acousticness >= ${acousticnessLow} AND 
    acousticness <= ${acousticnessHigh} AND danceability >= ${danceabilityLow} AND 
    danceability <= ${danceabilityHigh} AND energy >= ${energyLow} AND energy <= ${energyHigh} AND 
    valence >= ${valenceLow} AND valence <= ${valenceHigh} AND liveness >= ${livenessLow} AND 
    liveness <= ${livenessHigh} AND speechiness >= ${speechinessLow} AND 
    speechiness <= ${speechinessHigh}
  )
  SELECT *
  FROM Song JOIN ComposedBy cb ON Song.song_id = cb.song_id JOIN Artist ON cb.artist_id = Artist.artist_id AND Artist.name = Song.artist JOIN songsByArtists ON Song.song_id = songsByArtists.song_id
  `, (error, results) => {
    if (error) {
      res.json({ error })
    } else if (results) {
      res.json({ results })
    }
  })
})

module.exports = router
