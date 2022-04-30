import config from './config.json'

export const getStats = async () => {
  const res = await fetch(`http://${config.server_host}:${config.server_port}/user/stats`, {
    credentials: 'same-origin',
    method: 'GET',
  })
  const json = await res.json()
  return json.results[0]
}

export const getLikedSongs = async () => {
  const res = await fetch(`http://${config.server_host}:${config.server_port}/user/likes-list`, {
    credentials: 'same-origin',
    method: 'GET',
  })
  const json = await res.json()
  return json?.results ?? []
}

export const getTopArtists = async () => {
  const res = await fetch(`http://${config.server_host}:${config.server_port}/user/top-artists`, {
    credentials: 'same-origin',
    method: 'GET',
  })
  const json = await res.json()
  return json?.results ?? []
}
