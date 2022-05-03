import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantize } from 'd3-scale'

import config from '../config.json'

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

  const getArtistData = async () => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/heatmap`, {
      method: 'GET',
    })
    const json = await res.json()
    return json.results
  }

  useEffect(() => {
    getArtistData().then((countries) => {
      setData(countries)
    })
  }, [])

  return (
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
  )
}

export default Heatmap
