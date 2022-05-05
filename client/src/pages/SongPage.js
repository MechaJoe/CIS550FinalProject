import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { RadarChart, CircularGridLines } from 'react-vis'
import SongCard from '../components/SongCard'
import NavBar from '../components/NavBar'
import { getSong } from '../fetcher'

export default function SongPage() {
  const location = useLocation()
  const selectedSongId = location.search.substring(4)
  const [selectedSongDetails, setSelectedSongDetails] = useState(null)

  useEffect(() => {
    getSong(selectedSongId).then((res) => {
      setSelectedSongDetails(res.results[0])
    })
  })

  return (
    <Box>
      <NavBar />
      <Divider />
      {selectedSongDetails ? (
        <Box sx={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid container direction="column">
              <Typography variant="h3">{selectedSongDetails?.name?.toUpperCase()}</Typography>
            </Grid>
          </Grid>

          <Card>
            <CardContent>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <SongCard
                  songId={selectedSongDetails.song_id}
                  title={selectedSongDetails.title}
                  artists={selectedSongDetails.artist}
                  key={selectedSongDetails.song_id}
                  alreadyLiked
                />
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Year Released: ${selectedSongDetails.year}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Duration (ms): ${selectedSongDetails.duration_ms}`}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography>
                    {`Tempo: ${selectedSongDetails.tempo}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Mode (Minor/Major): ${selectedSongDetails.mode}`}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography>
                    {`Explicit: ${selectedSongDetails.explicit}`}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography>
                    {`Popularity: ${selectedSongDetails.popularity}`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card style={{ marginTop: '2vh' }}>
            <CardContent>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column" sx={{ textAlign: 'left' }}>

                  <Typography variant="h6">Acousticness</Typography>
                  <Slider value={selectedSongDetails.acousticness} min={0} max={1} disabled />

                  <Typography variant="h6">Danceability</Typography>
                  <Slider value={selectedSongDetails.acousticness} min={0} max={1} disabled />
                  <Typography variant="h6">Energy</Typography>
                  <Slider value={selectedSongDetails.energy} min={0} max={1} disabled />

                  <Typography variant="h6">Instrumentalness</Typography>
                  <Slider value={selectedSongDetails.instrumentalness} min={0} max={1} disabled />

                  <Typography variant="h6">Liveness</Typography>
                  <Slider value={selectedSongDetails.liveness} min={0} max={1} disabled />

                  <Typography variant="h6">Speechiness</Typography>
                  <Slider value={selectedSongDetails.speechiness} min={0} max={1} disabled />
                  <Typography variant="h6">Valence</Typography>
                  <Slider value={selectedSongDetails.valence} min={0} max={1} disabled />
                  <Typography variant="h6">Loudness</Typography>
                  <Slider value={selectedSongDetails.loudness} min={0} max={1} disabled />

                </Grid>
                <Grid container direction="column">

                  <Box className="centered-and-flexed">
                    <RadarChart
                      animation
                      data={[selectedSongDetails]}
                      domains={[
                        { name: 'Energy', domain: [0, 1], getValue: (d) => d.energy },
                        { name: 'Danceability', domain: [0, 1], getValue: (d) => d.danceability },
                        { name: 'Acousticness', domain: [0, 1], getValue: (d) => d.acousticness },
                        { name: 'Speechiness', domain: [0, 1], getValue: (d) => d.speechiness },
                        { name: 'Liveness', domain: [0, 1], getValue: (d) => d.liveness },
                        { name: 'Instrumentalness', domain: [0, 1], getValue: (d) => d.instrumentalness },
                      ]}
                      style={{ polygons: { fillOpacity: 0, strokeWidth: 3 }, axes: { text: { opacity: 1 } }, labels: { textAnchor: 'middle' } }}
                      margin={{
                        left: 60, top: 30, bottom: 30, right: 80,
                      }}
                      // eslint-disable-next-line no-unused-vars
                      tickFormat={(t) => ''}
                      width={400}
                      height={300}
                    >
                      <CircularGridLines
                        tickValues={[...new Array(5)].map((v, i) => i / 5 - 1)}
                        style={{
                          fill: 'rgba(114,172,240,0.5)',
                          fillOpacity: 0.5,
                        }}
                      />
                    </RadarChart>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Box>
      ) : null}
    </Box>
  )
}
