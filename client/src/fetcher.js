/* eslint-disable */
import axios from 'axios'
import config from './config.json'

export const getSearchBySong = async (
  input,
  acousticnessLowQuery,
  acousticnessHighQuery,
  danceabilityLowQuery,
  danceabilityHighQuery,
  energyLowQuery,
  energyHighQuery,
  valenceLowQuery,
  valenceHighQuery,
  // livenessLowQuery,
  // livenessHighQuery,
  // speechinessLowQuery,
  // speechinessHighQuery,
) => {
  const res = await fetch(`http://${config.server_host}:${config.server_port}/search/song?song=${input}&acousticnessLow=${acousticnessLowQuery}&acousticnessHigh=${acousticnessHighQuery}&danceabilityLow=${danceabilityLowQuery}&danceabilityHigh=${danceabilityHighQuery}&energyLow=${energyLowQuery}&energyHigh=${energyHighQuery}&valenceLow=${valenceLowQuery}&valenceHigh=${valenceHighQuery}`, {
    method: 'GET',
  })

  return res.json()
}

export const getCurrUser = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/username`,
    { withCredentials: true },
  )
  return data
}

export const getStats = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/user/stats`,
    { withCredentials: true },
  )
  return data.results[0]
}

export const getLikedSongs = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/user/likes-list`,
    { withCredentials: true },
  )
  const res = data?.results ?? []
  // map song_id to [list of artists, title]
  const idToSong = res.reduce((acc, obj) => {
    try {
      acc[obj.song_id] = [[obj.artist].concat(acc[obj.song_id][0]), obj.title]
    } catch (e) {
      acc[obj.song_id] = [[obj.artist], obj.title]
    }
    return acc
  }, {})
  return Object.entries(idToSong)
}

export const getTopArtists = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/user/top-artists`,
    { withCredentials: true },
  )
  return data?.results ?? []
}

export const setUserLocation = async (user, location) => {
  const { data } = await axios.post(
    `http://${config.server_host}:${config.server_port}/user/set-location`,
    { location },
    { withCredentials: true },
  )
  return data?.changedRows ?? 0
}

export const getUserLocation = async () => {
  const { data } = await axios.post(
    `http://${config.server_host}:${config.server_port}/user/location`,
    { withCredentials: true },
  )
  return data?.results[0]?.location ?? 'N/A'
}

export const setLikeSong = async (songId, liked) => {
  let res
  if (liked) {
    res = await axios.post(
      `http://${config.server_host}:${config.server_port}/like`,
      { song_id: songId },
      { withCredentials: true },
    )
  } else {
    res = await axios.delete(
      `http://${config.server_host}:${config.server_port}/unlike`,
      { data: { song_id: songId } },
      { withCredentials: true },
    )
  }
  return res?.affectedRows
}

export const getArtist = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artist/artist_info?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

export const getSong = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/song/song_info?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

export const getArtistSearch = async (name, location, scrobbles, listeners, tags, genre, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/artists?name=${name}}&location=${location}&listeners=${listeners}&scrobbles=${scrobbles}&tags=${tags}&genre=${genre}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

export const getSongSearch = async (title, artist, acousticness, danceability, duration_ms, energy, explicit, instrumentalness, liveness, loudness, mode, popularity, speechiness, tempo, valence, year, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/songs?title=${title}&artist=${artist}&acousticness=${acousticness}&danceability=${danceability}&duration_ms=${duration_ms}&energy=${energy}&explicit=${explicit}&instrumentalness=${instrumentalness}&liveness=${liveness}&loudness=${loudness}&mode=${mode}&popularity=${popularity}&speechiness=${speechiness}&tempo=${tempo}&valence=${valence}&year=${year}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

