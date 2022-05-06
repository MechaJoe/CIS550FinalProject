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
  livenessLowQuery,
  livenessHighQuery,
  speechinessLowQuery,
  speechinessHighQuery,
) => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/search/song?song=${input}&acousticnessLow=${acousticnessLowQuery}&acousticnessHigh=${acousticnessHighQuery}&danceabilityLow=${danceabilityLowQuery}&danceabilityHigh=${danceabilityHighQuery}&energyLow=${energyLowQuery}&energyHigh=${energyHighQuery}&valenceLow=${valenceLowQuery}&valenceHigh=${valenceHighQuery}&livenessLow=${livenessLowQuery}&livenessHigh=${livenessHighQuery}&speechinessLow=${speechinessLowQuery}&speechinessHigh=${speechinessHighQuery}`,
    { withCredentials: true },
  )

  const res = data?.results ?? []
  // console.log(`Results: ${res}`)
  // map song_id to [list of artists, title]
  const idToSong = res.reduce((acc, obj) => {
    try {
      acc[obj.song_id] = [
        [obj.artist].concat(acc[obj.song_id][0]),
        [obj.artist_id].concat(acc[obj.song_id][1]),
        obj.title,
      ]
    } catch (e) {
      acc[obj.song_id] = [[obj.artist], [obj.artist_id], obj.title]
    }
    return acc
  }, {})
  return Object.entries(idToSong)
}

export const getSearchByArtist = async (
  input,
  acousticnessLowQuery,
  acousticnessHighQuery,
  danceabilityLowQuery,
  danceabilityHighQuery,
  energyLowQuery,
  energyHighQuery,
  valenceLowQuery,
  valenceHighQuery,
  livenessLowQuery,
  livenessHighQuery,
  speechinessLowQuery,
  speechinessHighQuery,
) => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/search/artist?artist=${input}&acousticnessLow=${acousticnessLowQuery}&acousticnessHigh=${acousticnessHighQuery}&danceabilityLow=${danceabilityLowQuery}&danceabilityHigh=${danceabilityHighQuery}&energyLow=${energyLowQuery}&energyHigh=${energyHighQuery}&valenceLow=${valenceLowQuery}&valenceHigh=${valenceHighQuery}&livenessLow=${livenessLowQuery}&livenessHigh=${livenessHighQuery}&speechinessLow=${speechinessLowQuery}&speechinessHigh=${speechinessHighQuery}`,
    { withCredentials: true },
  )
  // const data = await fetch(`http://${config.server_host}:${config.server_port}/search/song?song=${input}&acousticnessLow=${acousticnessLowQuery}&acousticnessHigh=${acousticnessHighQuery}&danceabilityLow=${danceabilityLowQuery}&danceabilityHigh=${danceabilityHighQuery}&energyLow=${energyLowQuery}&energyHigh=${energyHighQuery}&valenceLow=${valenceLowQuery}&valenceHigh=${valenceHighQuery}&livenessLow=${livenessLowQuery}&livenessHigh=${livenessHighQuery}&speechinessLow=${speechinessLowQuery}&speechinessHigh=${speechinessHighQuery}`, {
  //   method: 'GET',
  // })

  // return res.json()

  const res = data?.results ?? []
  // console.log(`Results: ${res}`)
  // map song_id to [list of artists, title]
  const idToSong = res.reduce((acc, obj) => {
    try {
      acc[obj.song_id] = [
        [obj.artist].concat(acc[obj.song_id][0]),
        [obj.artist_id].concat(acc[obj.song_id][1]),
        obj.title,
      ]
    } catch (e) {
      acc[obj.song_id] = [[obj.artist], [obj.artist_id], obj.title]
    }
    return acc
  }, {})
  return Object.entries(idToSong)
}

export const getCurrUser = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/username`,
    { withCredentials: true },
  )
  // console.log(data)
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
  return Object.entries(idToSong) // [song_id, [list of artists, title]]
}

export const getTopArtists = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/user/top-artists`,
    { withCredentials: true },
  )
  return data?.results ?? []
}

export const setUserLocation = async (location) => {
  const { data } = await axios.post(
    `http://${config.server_host}:${config.server_port}/user/set-location`,
    { location },
    { withCredentials: true },
  )
  return data?.changedRows ?? 0
}

export const getUserLocation = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/user/location`,
    { withCredentials: true },
  )
  return data?.results[0]?.location ?? 'N/A'
}

export const getUserLocationCounts = async () => {
  const res = await axios.get(`http://${config.server_host}:${config.server_port}/user/count-by-location`)
  return res.data.results
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
    res = await axios.post(
      `http://${config.server_host}:${config.server_port}/unlike`,
      { song_id: songId },
      { withCredentials: true },
    )
  }
  return res?.affectedRows
}

export const getArtistLocationCounts = async () => {
  const { data } = await axios.get(`http://${config.server_host}:${config.server_port}/artist/count-by-location`)
  return data.results
}

export const getArtistLocationPopularity = async (id) => {
  const { data } = await axios.get(`http://${config.server_host}:${config.server_port}/artist/location-score?artist_id=${id}`)
  return data.results
}

export const getArtist = async (id) => {
  const { data } = await axios.get(`http://${config.server_host}:${config.server_port}/artist/info?id=${id}`)
  return data
}

export const getSong = async (id) => {
  const { data } = await axios.get(`http://${config.server_host}:${config.server_port}/song/info?id=${id}`)
  return data
}

export const getArtistsByLocationLikes = async (country) => {
  const { data } = await axios.get(`http://${config.server_host}:${config.server_port}/artist/recommended-by-location?location=${country}`)
  return data?.results ?? []
}
