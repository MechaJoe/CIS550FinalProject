import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import SongCard from '../components/SongCard'
import NavBar from '../components/NavBar'
import {
  getStats, getLikedSongs, getTopArtists,
  // getCurrUser,
} from '../fetcher'

export default function UserProfile() {
  // const [user, setUser] = useState('')
  const [name, setName] = useState('')
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

  const getFirstName = async () => {
    const { data } = await axios.get('http://localhost:8080/name', { withCredentials: true })
    return data
  }

  useEffect(() => {
    getFirstName()
      .then((data) => { setName(data.first_name) })
  }, [])

  return (
    <Box
      sx={{
        width: '99%',
        justify: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <NavBar />
      <Typography variant="h1">
        Hi,
        {' '}
        {name}
        !
      </Typography>

      <Box
        sx={{
          width: '90%',
          justify: 'center',
          alignItems: 'center',
          margin: '2rem 0.5rem',
        }}
      >
        <Typography variant="h3">
          My Stats
        </Typography>
        <Typography variant="overline">Average Acousticness</Typography>
        <Slider value={stats?.avg_acousticness ?? 0.5} min={0} max={1} disabled />
        <Typography variant="overline">Average Danceability</Typography>
        <Slider value={stats?.avg_danceability ?? 0.5} min={0} max={1} disabled />
        <Typography variant="overline">Average Energy</Typography>
        <Slider value={stats?.avg_energy ?? 0.5} min={0} max={1} disabled />
        <Typography variant="overline">Average Valence</Typography>
        <Slider value={stats?.avg_valence ?? 0.5} min={0} max={1} disabled />
        <Typography variant="overline">Average Liveness</Typography>
        <Slider value={stats?.avg_liveness ?? 0.5} min={0} max={1} disabled />
        <Typography variant="overline">Average Speechiness</Typography>
        <Slider value={stats?.avg_speechiness ?? 0.5} min={0} max={1} disabled />
      </Box>
      <Divider />
      <Box
        sx={{
          width: '90%',
          justify: 'center',
          alignItems: 'center',
          margin: '2rem 0.5rem',
        }}
      >
        <Typography variant="h3">
          My Liked Songs
        </Typography>
        {likedSongs.length === 0
          ? <Typography variant="overline">None yet!</Typography>
          : (
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              sx={{ marginTop: '1rem' }}
            >
              {(likedSongs.slice(0, Math.min(5, likedSongs.length))).map((elem) => (
                <SongCard
                  songId={elem[0]}
                  title={elem[1][1]}
                  artists={elem[1][0].join(', ') ?? ''}
                  key={likedSongs.indexOf(elem)}
                  alreadyLiked
                />
              ))}
            </Grid>
          )}
      </Box>
      <Divider />
      <Box
        sx={{
          width: '90%',
          justify: 'center',
          alignItems: 'center',
          margin: '2rem 0.5rem',
        }}
      >
        <Typography variant="h3">
          My Top Artists
        </Typography>
        {topArtists.length === 0
          ? <Typography variant="overline">None yet!</Typography>
          : topArtists.map((elem) => (
            <Container key={elem.name} sx={{ margin: '1.5rem 0' }}>
              <Typography variant="h5">{elem.name.toUpperCase()}</Typography>
              <Typography variant="subtitle1">
                {`Listening percentage: ${elem.listening_percentage}%`}
              </Typography>
            </Container>
          ))}
      </Box>
    </Box>
  )
}
