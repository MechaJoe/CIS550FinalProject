import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function SearchPage() {
  return (
    <Box
      sx={{
        width: '80%',
        justify: 'center',
        alignItems: 'center',
      }}
    >
      <TextField fullWidth label="search" id="search" />
    </Box>
  )
}
