/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import axios from 'axios'
import { setLikeSong } from '../fetcher'

export default function SongCard({
  songId, title, artists, alreadyLiked,
}) {
  const [isLiked, setIsLiked] = useState(alreadyLiked)
  // eslint-disable-next-line no-unused-vars
  const [realSongId, setSongId] = useState(songId)
  const handleLike = (e) => {
    e.preventDefault()
    setLikeSong(realSongId, !isLiked)
    setIsLiked(!isLiked)
  }

  useEffect(async () => {
    const { data } = await axios.get('http://localhost:8080/username', { withCredentials: true })
    console.log(data)

    const { data: likedSongs } = await axios.get('http://localhost:8080/user/likes-list', { withCredentials: true })
    console.log(likedSongs.results)
    likedSongs.results.forEach((song) => {
      if (song.song_id === realSongId) {
        setIsLiked(true)
      }
    })
    console.log(isLiked)
  }, [])

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader
          title={title}
          subheader={artists}
        />
        <Button variant="contained" color="primary" onClick={(e) => handleLike(e)}>
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
      </Card>
    </Grid>
  )
}
