import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import NavBar from '../components/NavBar'
import {
  getUserLocation, setUserLocation,
} from '../fetcher'

const countries = ['United States', 'Canada', 'Mexico']

export default function EditUser() {
  const [location, setLocation] = useState('')
  const [newLocation, setNewLocation] = useState('')

  useEffect(() => {
    getUserLocation().then(setLocation)
  })

  const handleLocationChange = (event, value) => {
    setNewLocation(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUserLocation(newLocation)
    setLocation(newLocation)
  }

  return (
    <Box
      sx={{
        width: '99%',
        justify: 'center',
        alignItems: 'center',
      }}
    >
      <NavBar />
      <Box
        sx={{
          width: '90%',
          padding: '1rem',
          justify: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Change my location</Typography>
        <Typography variant="h5">{`current: ${location}`}</Typography>
        <Autocomplete
          disablePortal
          options={countries}
          onChange={handleLocationChange}
          autoHighlight
          renderInput={
            (params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                variant="outlined"
                label="Choose a country"
              />
            )
          }
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Change</Button>
      </Box>
    </Box>
  )
}
