import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function SearchPage() {
  const history = useHistory()
  // const [signedIn, setSignedIn] = useState(false)

  const checkSession = async () => {
    const { data } = await axios.get('http://localhost:8080/username', { withCredentials: true })
    console.log(data)
    // setSignedIn(data && data !== '')
  }

  useEffect(() => {
    checkSession()
  }, [])

  const logout = async () => {
    const { data } = await axios.post('http://localhost:8080/logout', {}, { withCredentials: true })
    console.log(data)
    history.push('/login')
  }

  return (
    <Box
      sx={{
        width: '80%',
        justify: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" component="h2">
        Music Bar!
      </Typography>
      <TextField fullWidth label="song or artist name..." id="search" />
      <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
    </Box>
  )
}
