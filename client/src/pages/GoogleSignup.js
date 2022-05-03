import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import axios from 'axios'

const locationArray = require('./locations.json')

export default function Signup() {
  const defaultValues = {
    first_name: '',
    last_name: '',
    pronouns: '',
    location: '',
  }

  const names = {
    first_name: 'First Name',
    last_name: 'Last Name',
    pronouns: 'Pronouns',
    location: 'Location',
  }

  const [formValues, setFormValues] = useState(defaultValues)
  const handleInputChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formValues)
    axios.post('/api/users', formValues, { withCredentials: true })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h2" component="h1" align="center">Create Account</Typography>
      <Grid container alignItems="center" justify="center" direction="column" spacing="10">
        {Object.keys(defaultValues).map((key) => (
          key !== 'location' ? (
            <Grid item key={key}>
              <TextField
                id={key}
                name={key}
                label={names[key]}
                type="text"
                value={formValues[key]}
                onChange={handleInputChange}
                required
              />
            </Grid>
          ) : null
        ))}
        <Grid item>
          <FormControl fullWidth sx={{ minWidth: 195 }}>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              id="location"
              name="location"
              label="Location"
              defaultValue="United States"
              value={formValues.location}
              onChange={handleInputChange}
              required
            >
              {locationArray.locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit" sx={{ minWidth: 195 }}>Complete Google Signup</Button>
        </Grid>
      </Grid>
    </form>
  )
}
