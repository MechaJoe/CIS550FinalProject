import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantize } from 'd3-scale'

import NavBar from '../components/NavBar'
import { getArtistData } from '../fetcher'

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

function Heatmap() {
  const [data, setData] = useState([])

  useEffect(() => {
    getArtistData().then((countries) => {
      setData(countries)
    })
  }, [])

  return (
    <Box>
      <NavBar />
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
  )
}

export default Heatmap
