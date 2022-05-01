import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    getSearchBySong().then(setInput)
  }, [])

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

  return (
    <FormControl>
      <Typography variant="h1" component="h2">
        MusicBar
      </Typography>
      <div id="hello">
        <TextField id="search-input" label="Search" variant="outlined" sx={{ padding: '15px' }} onChange={(e) => setInput(e.target.value)} />
        <Typography gutterBottom>Acousticness</Typography>
        <Slider id="acousticness" range defaultValue={[0, 1]} valueLabelDisplay="auto" onChange={handleAcousticnessChange} />
        <Typography gutterBottom>Danceability</Typography>
        <Slider id="danceability" range defaultValue={[0, 1]} onChange={handleDanceabilityChange} />
        <Typography gutterBottom>Energy</Typography>
        <Slider id="energy" range defaultValue={[0, 1]} onChange={handleEnergyChange} />
        <Typography gutterBottom>Valence</Typography>
        <Slider id="valence" range defaultValue={[0, 1]} onChange={handleValenceChange} />
        <Typography gutterBottom>Liveness</Typography>
        <Slider id="liveness" range defaultValue={[0, 1]} onChange={handleLivenessChange} />
        <Typography gutterBottom>Speechiness</Typography>
        <Slider id="speechiness" range defaultValue={[0, 1]} onChange={handleSpeechinessChange} />
        <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
          <Button> By Song </Button>
          <Button> By Artist </Button>
        </ButtonGroup>
      </div>
    </FormControl>
  )
}

export default SearchPage
