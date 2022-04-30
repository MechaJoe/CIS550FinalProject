import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import config from '../config.json'

export default function UserProfile() {
  const [stats, setStats] = useState({})

  const getStats = async () => {
    // query stats
    const res = await fetch(`http://${config.server_host}:${config.server_port}/personal/attrs`, {
      credentials: 'same-origin',
      method: 'GET',
    })
    const json = await res.json()
    return json.results[0]
  }

  useEffect(() => {
    getStats().then(setStats)
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
        Me
      </Typography>

      <Typography variant="h3">
        My Stats
      </Typography>
      <Typography variant="overline">Average Acousticness</Typography>
      <Slider value={stats.avg_acousticness ?? 0.5} min={0} max={1} disabled />
      <Typography variant="overline">Average Danceability</Typography>
      <Slider value={stats.avg_danceability ?? 0.5} min={0} max={1} disabled />
      <Typography variant="overline">Average Energy</Typography>
      <Slider value={stats.avg_energy ?? 0.5} min={0} max={1} disabled />
      <Typography variant="overline">Average Valence</Typography>
      <Slider value={stats.avg_valence ?? 0.5} min={0} max={1} disabled />
      <Typography variant="overline">Average Liveness</Typography>
      <Slider value={stats.avg_liveness ?? 0.5} min={0} max={1} disabled />
      <Typography variant="overline">Average Speechiness</Typography>
      <Slider value={stats.avg_speechiness ?? 0.5} min={0} max={1} disabled />
    </Box>
  )
}
