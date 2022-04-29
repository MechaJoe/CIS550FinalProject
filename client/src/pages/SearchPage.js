import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function SearchPage() {
  return (
    <Box
      sx={{
        width: '80%',
        justify: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" component="h2">
        Music Bar
      </Typography>
      <TextField fullWidth label="song or artist name..." id="search" />
    </Box>
  )
}
