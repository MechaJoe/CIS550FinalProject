import axios from 'axios'
import config from './config.json'

export const getCurrUser = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/username`,
    { withCredentials: true },
  )
  console.log(data)
  return data.username
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
  return data?.results ?? []
}

export const getTopArtists = async () => {
  const { data } = await axios.get(
    `http://${config.server_host}:${config.server_port}/user/top-artists`,
    { withCredentials: true },
  )
  return data?.results ?? []
}
