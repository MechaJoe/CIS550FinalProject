import React from 'react'
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import config from '../config.json'

export default function SearchPage() {
  const history = useHistory()
  const user = {
    username: 'test2',
    password: 'test2pass',
  }

  const login = async () => {
    await fetch(`http://${config.server_host}:${config.server_port}/login`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
  }

  return (
    <Box
      sx={{
        width: '80%',
        justify: 'center',
        alignItems: 'center',
      }}
    >
      <Button variant="text" onClick={login}>Login</Button>
      <Button variant="text" onClick={() => { history.push('/me') }}>Personal</Button>
      <Typography variant="h1" component="h2">
        Music Bar!
      </Typography>
      <TextField fullWidth label="song or artist name..." id="search" />
    </Box>
  )
}
