import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import {
  getStats, getLikedSongs, getTopArtists, getCurrUser, getUserLocation,
  setUserLocation,
} from '../fetcher'

export default function UserProfile() {
  const [user, setUser] = useState('')
  const [location, setLocation] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [stats, setStats] = useState({})
  const [likedSongs, setLikedSongs] = useState([])
  const [topArtists, setTopArtists] = useState([])

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  useEffect(() => {
    getLikedSongs().then(setLikedSongs)
  }, [])

  useEffect(() => {
    getTopArtists().then(setTopArtists)
  }, [])

  useEffect(() => {
    getCurrUser().then(setUser)
  })

  useEffect(() => {
    getUserLocation().then(setLocation)
  })

  const handleLocationChange = (event) => {
    setNewLocation(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUserLocation(user, newLocation)
    setLocation(newLocation)
  }

  return (
    <Box
      sx={{
        width: '99%',
        justify: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">
        {user}
      </Typography>

      <Box
        sx={{
          width: '90%',
          justify: 'center',
          alignItems: 'center',
        }}
      >
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

      <Box
        sx={{
          width: '90%',
          justify: 'center',
          alignItems: 'center',
        }}
      >
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

      <Box
        sx={{
          width: '90%',
          justify: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">
          My Top Artists
        </Typography>
        {topArtists.map((elem) => (
          <Container key={elem.name}>
            <Typography variant="h5">{elem.name}</Typography>
            <Typography variant="subtitle1">
              {`Listening percentage: ${elem.listening_percentage}%`}
            </Typography>
          </Container>
        ))}
      </Box>

      <Box
        sx={{
          width: '90%',
          justify: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">
          {`Change my location (current: ${location})`}
        </Typography>
        <TextField label="location" id="location" onChange={handleLocationChange} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Change</Button>
      </Box>

    </Box>
  )
}
