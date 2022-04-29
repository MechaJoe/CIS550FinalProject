import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import config from '../config.json'

export default function UserProfile() {
  const [stats, setStats] = useState({})
  const user = {
    username: 'test1',
    password: 'test1pass',
  }

  const login = async () => {
    await fetch(`http://${config.server_host}:${config.server_port}/personal/attrs`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(user),
    })
  }

  const getStats = async () => {
    // query stats
    const res = await fetch(`http://${config.server_host}:${config.server_port}/personal/attrs`, {
      credentials: 'same-origin',
      method: 'GET',
    })
    const json = await res.json()
    return json.results
  }

  useEffect(() => {
    login().then(getStats().then(setStats))
  }, [])

  return (
    <Box
      sx={{
        width: '80%',
        justify: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">
        {user.username}
      </Typography>

      <Typography variant="h3">
        My Stats
      </Typography>
      <Typography variant="body1">My Stats</Typography>
      <Typography variant="overline">Average Acousticness</Typography>
      <Slider defaultValue={stats.avg_acousticness} min={0} max={100} disabled />
      <Typography variant="overline">Average Danceability</Typography>
      <Slider defaultValue={stats.avg_danceability} min={0} max={100} disabled />
      <Typography variant="overline">Average Energy</Typography>
      <Slider defaultValue={stats.avg_energy} min={0} max={100} disabled />
      <Typography variant="overline">Average Valence</Typography>
      <Slider defaultValue={stats.avg_valence} min={0} max={100} disabled />
      <Typography variant="overline">Average Liveness</Typography>
      <Slider defaultValue={stats.avg_liveness} min={0} max={100} disabled />
      <Typography variant="overline">Average Speechiness</Typography>
      <Slider defaultValue={stats.avg_speechiness} min={0} max={100} disabled />
    </Box>
  )
}
