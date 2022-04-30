import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { getStats, getLikedSongs } from '../fetcher'

export default function UserProfile() {
  const [stats, setStats] = useState({})
  const [likedSongs, setLikedSongs] = useState([])

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  useEffect(() => {
    getLikedSongs().then(setLikedSongs)
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

      <Typography variant="h3">
        My Liked Songs
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {likedSongs.map((elem) => (
          <Grid item xs={12} sm={6} md={3} key={likedSongs.indexOf(elem)}>
            <Card>
              <CardHeader
                title={elem.title}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
