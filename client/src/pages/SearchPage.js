import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
  FormControl, TextField, Button, ButtonGroup, Typography, Slider, TableContainer,
  TableHead, TableRow, TableCell, TableBody, Table, Paper, Link,
} from '@mui/material'
// import SongCard from '../components/SongCard'
import NavBar from '../components/NavBar'
import { getSearchBySong } from '../fetcher'

function SearchPage() {
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
  const [searchResults, setSearchResults] = useState([])

  // useStates for filter parameters
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

  // Call the fetch search query
  const handleSearchBySong = async () => {
    getSearchBySong(
      input,
      acousticnessLowQuery,
      acousticnessHighQuery,
      danceabilityLowQuery,
      danceabilityHighQuery,
      energyLowQuery,
      energyHighQuery,
      valenceLowQuery,
      valenceHighQuery,
      livenessLowQuery,
      livenessHighQuery,
      speechinessLowQuery,
      speechinessHighQuery,
    ).then((res) => {
      setSearchResults(res)
    })
  }
  console.log(searchResults)
  console.log(searchResults.length)

  const createData = (arr) => {
    const songId = arr[0]
    const title = arr[1][2]
    // const artists = arr[1][0].join(', ') ?? ''
    const artists = arr[1][0]
    const artistIds = arr[1][1]
    const url = `/song/?id=${songId}`
    const artistTups = []
    for (let i = 0; i < artists.length; i += 1) {
      const artist = artists[i]
      const artistId = artistIds[i]
      const artistUrl = `/artist/?id=${artistId}`
      artistTups.push({ artist, artistUrl })
    }
    return {
      songId, title, artists, url, artistIds, artistTups,
    }
  }

  const rows = []
  searchResults.forEach((song) => rows.push(createData(song)))

  // const handleSearchByArtist = async () => {
  //   getSearchByArtist(
  //     input,
  //     acousticnessLowQuery,
  //     acousticnessHighQuery,
  //     danceabilityLowQuery,
  //     danceabilityHighQuery,
  //     energyLowQuery,
  //     energyHighQuery,
  //     valenceLowQuery,
  //     valenceHighQuery,
  //     livenessLowQuery,
  //     livenessHighQuery,
  //     speechinessLowQuery,
  //     speechinessHighQuery,
  //   ).then((res) => {
  //     setSearchResults(res.results)
  //   })
  // }

  return (
    <>
      <NavBar />
      <FormControl>
        <Typography variant="h1" component="h2">
          MusicBar
        </Typography>
        <Button variant="text" onClick={() => { history.push('/me') }}>Personal</Button>
        <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
        <div id="hello">
          <TextField id="search-input" label="Search" variant="outlined" sx={{ padding: '15px' }} onChange={(e) => setInput(e.target.value)} />
          <Typography gutterBottom>Acousticness</Typography>
          <Slider id="acousticness" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleAcousticnessChange(e.target.value)} />
          <Typography gutterBottom>Danceability</Typography>
          <Slider id="danceability" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleDanceabilityChange(e.target.value)} />
          <Typography gutterBottom>Energy</Typography>
          <Slider id="energy" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleEnergyChange(e.target.value)} />
          <Typography gutterBottom>Valence</Typography>
          <Slider id="valence" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleValenceChange(e.target.value)} />
          <Typography gutterBottom>Liveness</Typography>
          <Slider id="liveness" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleLivenessChange(e.target.value)} />
          <Typography gutterBottom>Speechiness</Typography>
          <Slider id="speechiness" range defaultValue={[0, 1]} min={0} max={1} step={0.1} marks valueLabelDisplay="auto" disableSwap onChange={(e) => handleSpeechinessChange(e.target.value)} />
          <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
            <Button onClick={handleSearchBySong}> By Song </Button>
            <Button> By Artist </Button>
          </ButtonGroup>
        </div>
      </FormControl>
      {searchResults.length === 0
        ? <Typography variant="overline">None yet!</Typography>
        : (
          <Paper>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Artist</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.title}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link href={row.url}>
                          {row.title}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        {row.artistTups.map((art) => (
                          <Link href={art.artistUrl}>
                            {art.artist}
                            &nbsp;
                          </Link>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
    </>
  )
}

export default SearchPage
