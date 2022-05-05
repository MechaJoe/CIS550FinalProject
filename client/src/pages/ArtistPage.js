import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantize } from 'd3-scale'

import NavBar from '../components/NavBar'
import { getArtist, getArtistLocationPopularity } from '../fetcher'

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618',
  ])

export default function ArtistPage() {
  const location = useLocation()
  const selectedArtistId = location.search.substring(4)
  const [selectedArtistDetails, setSelectedArtistDetails] = useState(null)
  const [mapData, setMapData] = useState([])

  useEffect(() => {
    getArtistLocationPopularity(selectedArtistId).then((countries) => {
      setMapData(countries)
    })
  }, [selectedArtistId])

  useEffect(() => {
    getArtist(selectedArtistId)
      .then((res) => {
        setSelectedArtistDetails(res.results[0])
      })
  }, [selectedArtistId])

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

          <Card sx={{ margin: '2rem' }}>
            <CardContent>
              <Grid container direction="row" justifyContent="left" alignItems="center">
                <Grid container direction="column">
                  <Typography variant="h5">Popularity Among Listeners</Typography>
                </Grid>
              </Grid>
              <ComposableMap projection="geoMercator">
                <Geographies geography={geoUrl}>
                  {({ geographies }) => geographies.map((geo) => {
                    const cur = mapData.find((s) => s.location.includes(geo.properties.NAME_LONG))
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={colorScale(cur ? cur.popularity : '#EEE')}
                      />
                    )
                  })}
                </Geographies>
              </ComposableMap>
            </CardContent>
          </Card>
        </Box>
      ) : null}

    </div>
  )
}
