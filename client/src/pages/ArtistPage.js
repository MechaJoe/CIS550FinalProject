import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import NavBar from '../components/NavBar'
import { getArtist } from '../fetcher'

export default function ArtistPage() {
  const location = useLocation()
  const selectedArtistId = location.search.substring(4)
  const [selectedArtistDetails, setSelectedArtistDetails] = useState(null)

  useEffect(() => {
    getArtist(selectedArtistId)
      .then((res) => {
        setSelectedArtistDetails(res.results[0])
      })
  }, [location, selectedArtistId])

  return (
    <div>
      <NavBar />
      <Divider />
      {selectedArtistDetails ? (
        <Box sx={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <Card sx={{ margin: '2rem' }}>
            <CardContent>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column">
                  <Typography variant="h3">{selectedArtistDetails?.name?.toUpperCase()}</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="left" alignItems="center">
                <Typography variant="h5">{selectedArtistDetails?.location}</Typography>
                <Typography variant="h5" sx={{ padding: '0 1rem' }}>•</Typography>
                <Typography variant="h5">{selectedArtistDetails?.genre}</Typography>
              </Grid>
              <Grid container direction="row" justifyContent="left" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Number of Listeners: ${selectedArtistDetails?.listeners}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="left" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Number of Scrobbles: ${selectedArtistDetails?.scrobbles}`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ margin: '2rem' }}>
            <CardContent>
              <Grid container direction="row" justifyContent="left" alignItems="center">
                <Grid container direction="column">
                  <Typography variant="h5">
                    {`Related tags to ${selectedArtistDetails?.name?.toUpperCase()}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="left" alignItems="center">
                <Grid container direction="column">
                  <Typography>{selectedArtistDetails?.tags}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Box>
      ) : null}

    </div>
  )
}
