const { expect } = require('@jest/globals')
const supertest = require('supertest')
const app = require('../server')

test('GET /heatmap', async () => {
  await supertest(app).get('/heatmap')
    .expect(200)
    .then(response => {
      // Check text
      expect(response.text.length).toBeGreaterThan(1000)
    })
})

test('GET /song/song-info', async () => {
  await supertest(app).get('/song/song_info?id=000jBcNljWTnyjB4YO7ojf')
    .expect(200)
    .then(response => {
      // Check text
      expect(response.text).toBe(`{"results":[{"song_id":"000jBcNljWTnyjB4YO7ojf","title":"Me Quieres Perjudicar","artist":"trio maravilla","acousticness":0.656,"danceability":0.788,"duration_ms":179747,"energy":0.808,"explicit":"0","instrumentalness":0,"liveness":0.154,"loudness":-6.59,"mode":"1","popularity":0,"speechiness":0.0395,"tempo":113.046,"valence":0.969,"year":1954}]}`)
    })
})

test('GET /artist/recommended-by-attrs', async () => {
  await supertest(app).get('/artist/recommended_by_attrs')
    .expect(200)
})

test('POST /login', async () => {
  const user = { username: 'test1', password: 'test1pass' }
  await supertest(app).post('/login').send(user)
    .expect(200)
    .then(response => {
      expect(response.text).toBe('Successful login')
    })
})

test('GET /heatmap', async () => {
  await supertest(app).get('/heatmap')
    .expect(200)
    .then(response => {
      // Check text
      expect(response.text.length).toBeGreaterThan(1000)
    })
})
