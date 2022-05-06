/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import axios from 'axios'
import { setLikeSong } from '../fetcher'

export default function SongCard({
  songId, title, artists,
}) {
  const [isLiked, setIsLiked] = useState(false)
  const handleLike = async (e) => {
    e.preventDefault()
    setLikeSong(songId, !isLiked)
    setIsLiked(!isLiked)
  }

  const getIsLiked = async () => {
    const { data: likedSongs } = await axios.get('http://localhost:8080/user/likes-list', { withCredentials: true })
    return likedSongs.results.reduce((acc, song) => acc || song.song_id === songId, false)
  }

  useEffect(() => {
    getIsLiked()
      .then((res) => setIsLiked(res))
  }, [songId])

  return (
    <Card sx={{ margin: '0.5rem', maxWidth: '45%' }}>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={title}
        subheader={artists.toUpperCase()}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => handleLike(e)}
        sx={{ display: 'flex', margin: '0.5rem auto' }}
      >
        {isLiked ? 'Unlike' : 'Like'}
      </Button>
    </Card>
  )
}
