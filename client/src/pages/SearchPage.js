import React, { useState } from 'react'
import {
  FormControl, TextField, Button, ButtonGroup, Typography, Slider,
} from '@mui/material'

import getSearchBySong from '../fetcher'

function SearchPage() {
  const [input, setInput] = useState('')
  const [acousticnessLowQuery, setAcousticnessLowQuery] = useState(0)
  const [acousticnessHighQuery, setAcousticnessHighQuery] = useState(1)
  const [danceabilityLowQuery, setDanceabilityLowQuery] = useState(0)
  const [danceabilityHighQuery, setDanceabilityHighQuery] = useState(1)
  const [energyLowQuery, setEnergyLowQuery] = useState(0)
  const [energyHighQuery, setEnergyHighQuery] = useState(1)
  const [valenceLowQuery, setValenceLowQuery] = useState(0)
  const [valenceHighQuery, setValenceHighQuery] = useState(1)
  const [livenessLowQuery, setLivenessLowQuery] = useState(0)
  const [livenessHighQuery, setLivenessHighQuery] = useState(1)
  const [speechinessLowQuery, setSpeechinessLowQuery] = useState(0)
  const [speechinessHighQuery, setSpeechinessHighQuery] = useState(1)
  const [searchResults, setSearchResults] = useState([])

  // useStates for filter parameters
  const handleAcousticnessChange = (value) => {
    setAcousticnessLowQuery(value[0])
    setAcousticnessHighQuery(value[1])
  }
  const handleDanceabilityChange = (value) => {
    setDanceabilityLowQuery(value[0])
    setDanceabilityHighQuery(value[1])
  }
  const handleEnergyChange = (value) => {
    setEnergyLowQuery(value[0])
    setEnergyHighQuery(value[1])
  }
  const handleValenceChange = (value) => {
    setValenceLowQuery(value[0])
    setValenceHighQuery(value[1])
  }
  const handleLivenessChange = (value) => {
    setLivenessLowQuery(value[0])
    setLivenessHighQuery(value[1])
  }
  const handleSpeechinessChange = (value) => {
    setSpeechinessLowQuery(value[0])
    setSpeechinessHighQuery(value[1])
  }

  // Call the fetch search query
  const handleSearchBySong = async () => {
    getSearchBySong(
      input,
      acousticnessLowQuery,
      acousticnessHighQuery,
      danceabilityLowQuery,
      danceabilityHighQuery,
      energyLowQuery,
      energyHighQuery,
      valenceLowQuery,
      valenceHighQuery,
      livenessLowQuery,
      livenessHighQuery,
      speechinessLowQuery,
      speechinessHighQuery,
    ).then((res) => {
      setSearchResults(res)
    })
  }
  console.log(searchResults)

  // const handleSearchByArtist = async () => {
  //   getSearchByArtist(
  //     input,
  //     acousticnessLowQuery,
  //     acousticnessHighQuery,
  //     danceabilityLowQuery,
  //     danceabilityHighQuery,
  //     energyLowQuery,
  //     energyHighQuery,
  //     valenceLowQuery,
  //     valenceHighQuery,
  //     livenessLowQuery,
  //     livenessHighQuery,
  //     speechinessLowQuery,
  //     speechinessHighQuery,
  //   ).then((res) => {
  //     setSearchResults(res.results)
  //   })
  // }

  return (
    <FormControl>
      <Typography variant="h1" component="h2">
        MusicBar
      </Typography>
      <div id="hello">
        <TextField id="search-input" label="Search" variant="outlined" sx={{ padding: '15px' }} onChange={(e) => setInput(e.target.value)} />
        <Typography gutterBottom>Acousticness</Typography>
        <Slider id="acousticness" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleAcousticnessChange(e.target.value)} />
        <Typography gutterBottom>Danceability</Typography>
        <Slider id="danceability" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleDanceabilityChange(e.target.value)} />
        <Typography gutterBottom>Energy</Typography>
        <Slider id="energy" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleEnergyChange(e.target.value)} />
        <Typography gutterBottom>Valence</Typography>
        <Slider id="valence" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleValenceChange(e.target.value)} />
        <Typography gutterBottom>Liveness</Typography>
        <Slider id="liveness" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleLivenessChange(e.target.value)} />
        <Typography gutterBottom>Speechiness</Typography>
        <Slider id="speechiness" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleSpeechinessChange(e.target.value)} />
        <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
          <Button onClick={handleSearchBySong}> By Song </Button>
          <Button> By Artist </Button>
        </ButtonGroup>
      </div>
    </FormControl>
  )
}

export default SearchPage
