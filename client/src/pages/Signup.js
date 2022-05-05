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
import { useHistory } from 'react-router-dom'
import locationArray from './locations.json'

export default function Signup() {
  const history = useHistory()
  const defaultValues = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    pronouns: '',
    location: '',
  }

  const names = {
    username: 'Username',
    password: 'Password',
    first_name: 'First Name',
    last_name: 'Last Name',
    pronouns: 'Pronouns',
    location: 'Location',
  }

  const [formValues, setFormValues] = useState(defaultValues)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formValues)
    const { data } = await axios.post('http://localhost:8080/signup', formValues, { withCredentials: true })
    console.log(data)
    if (data === 'Successful signup') {
      history.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="center" alignItems="center" direction="column" style={{ minHeight: '100vh' }} spacing="10">
        <Typography variant="h2" component="h1" align="center">Create MusicBar Account</Typography>
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
          <Button variant="contained" color="primary" type="submit" sx={{ minWidth: 195 }}>Create Account</Button>
        </Grid>
        <Grid item>
          <Button variant="outline" color="primary" type="button" sx={{ minWidth: 195 }} onClick={() => history.push('/login')}>Back</Button>
        </Grid>
      </Grid>
    </form>
  )
}
