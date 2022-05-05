import React from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'

export default function LoginPage() {
  const history = useHistory()
  const [username, setUsername] = React.useState('username')
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const [password, setPassword] = React.useState('password')
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const [loginError, setLoginError] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(username)
    console.log(password)
    const { data } = await axios.post('http://localhost:8080/login', { username, password }, { withCredentials: true })
    if (data === 'Successful login') {
      history.push('/')
    } else {
      setLoginError(true)
    }
  }

  // const testSession = async () => {
  //   const { data } = await axios.get('http://localhost:8080/username', { withCredentials: true })
  //   console.log(data)
  // }

  // <Button variant="contained" color="primary" onClick={testSession}>Test Session</Button>

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column" style={{ minHeight: '100vh' }}>
          {loginError
            ? (
              <Grid item xs={12}>
                <Alert severity="error">This combination of username and password does not match our records. You clown. 🤡 </Alert>
              </Grid>
            ) : null}
          <Grid item xs={12}>
            <Typography variant="h2" component="h1">
              Login to MusicBar
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="username" id="username" onChange={handleUsernameChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="password" id="password" onChange={handlePasswordChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" sx={{ minWidth: 195 }}>Login</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="button" onClick={() => history.push('/signup')} sx={{ minWidth: 195 }}>Signup</Button>
          </Grid>
          <Grid item xs={12}>
            <a className="button google" href="http://localhost:8080/login/federated/google">Login/Signup with Google</a>
          </Grid>
          <Grid item xs={12}>
            <a className="button google" href="http://localhost:8080/login/federated/linkedin">Login/Signup with LinkedIn</a>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
