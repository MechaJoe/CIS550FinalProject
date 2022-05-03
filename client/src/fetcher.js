import axios from 'axios'
import config from './config.json'

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
  if (liked) {
    await axios.post(
      `http://${config.server_host}:${config.server_port}/like`,
      { song_id: songId },
      { withCredentials: true },
    )
  } else {
    await axios.delete(
      `http://${config.server_host}:${config.server_port}/unlike`,
      { data: { song_id: songId } },
      { withCredentials: true },
    )
  }
}
