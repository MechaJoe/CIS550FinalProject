const express = require('express')

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
