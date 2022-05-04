import React, { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantize } from 'd3-scale'

import NavBar from '../components/NavBar'
import { getArtistLocationCounts, getUserLocationCounts } from '../fetcher'

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

const theme = createTheme({
  palette: {
    secondary: {
      main: '#808080',
    },
  },
})

function Heatmap() {
  const [data, setData] = useState([])
  const [displayArtistData, setDisplayArtistData] = useState(true)

  useEffect(() => {
    if (displayArtistData) {
      getArtistLocationCounts().then((countries) => {
        setData(countries)
      })
    } else {
      getUserLocationCounts().then((countries) => {
        setData(countries)
      })
    }
  }, [])

  return (
    <Box>
      <NavBar />
      <Box>
        <ThemeProvider theme={theme}>
          <ButtonGroup variant="contained" aria-label="text button group">
            <Button
              onClick={() => {
                setDisplayArtistData(true)
                getArtistLocationCounts().then((countries) => {
                  setData(countries)
                })
              }}
              color={displayArtistData ? 'primary' : 'secondary'}
            >
              Artist Map
            </Button>
            <Button
              onClick={() => {
                setDisplayArtistData(false)
                getUserLocationCounts().then((countries) => {
                  setData(countries)
                })
              }}
              color={displayArtistData ? 'secondary' : 'primary'}
            >
              User Map
            </Button>
          </ButtonGroup>
        </ThemeProvider>
        <ComposableMap projection="geoMercator">
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => {
              const cur = data.find((s) => s.location.includes(geo.properties.NAME_LONG))
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(cur ? cur.num_artists : '#EEE')}
                />
              )
            })}
          </Geographies>
        </ComposableMap>
      </Box>
    </Box>
  )
}

export default Heatmap
