import config from './config.json'

export const getStats = async () => {
  // query stats
  const res = await fetch(`http://${config.server_host}:${config.server_port}/personal/attrs`, {
    credentials: 'same-origin',
    method: 'GET',
  })
  const json = await res.json()
  return json.results[0]
}

export const getLikedSongs = async () => {
  // query stats
  const res = await fetch(`http://${config.server_host}:${config.server_port}/user/likes-list`, {
    credentials: 'same-origin',
    method: 'GET',
  })
  const json = await res.json()
  return json?.results ?? []
}
