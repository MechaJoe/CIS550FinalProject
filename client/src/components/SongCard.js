/* eslint-disable react/prop-types */
import React, { useState } from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { setLikeSong } from '../fetcher'

export default function SongCard({
  songId, title, artists, alreadyLiked,
}) {
  const [isLiked, setIsLiked] = useState(alreadyLiked)
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeSong(songId, !isLiked)
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader
          title={title}
          subheader={artists}
        />
        <Button variant="contained" color="primary" onClick={handleLike}>
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
      </Card>
    </Grid>
  )
}
