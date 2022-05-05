import React from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'
import Alert from '@mui/material/Alert'

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

  const testSession = async () => {
    const { data } = await axios.get('http://localhost:8080/username', { withCredentials: true })
    console.log(data)
  }

  return (
    <>
      {loginError ? <Alert severity="error">This combination of username and password does not match our records. You clown. 🤡 </Alert> : null}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: '80%',
            justify: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" component="h1">
            Login to MusicBar
          </Typography>
          <TextField label="username" id="username" onChange={handleUsernameChange} />
          <TextField label="password" id="password" onChange={handlePasswordChange} />
          <Button variant="contained" color="primary" type="submit">Login</Button>
          <a className="button google" href="http://localhost:8080/login/federated/google">Login/Signup with Google</a>
          <a className="button google" href="http://localhost:8080/login/federated/linkedin">Login/Signup with LinkedIn</a>
        </Box>
      </form>
      <Button variant="contained" color="primary" onClick={testSession}>Test Session</Button>
    </>
  )
}
