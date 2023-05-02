import React, { useState, useEffect } from 'react'
import {
  Typography, TableContainer, TableRow, TableCell, TableBody, Table, Paper, Link, Box,
} from '@mui/material'
import NavBar from '../components/NavBar'
import { getUserLocation, getArtistsByLocationLikes, getArtistsBySimilarAttributes } from '../fetcher'

function SearchPage() {
  const [recArtistsByLocationLikes, setRecArtistsByLocationLikes] = useState([])
  const [recArtistsByAttrs, setRecArtistsByAttrs] = useState([])

  useEffect(() => {
    getUserLocation().then((location) => {
      getArtistsByLocationLikes(location).then((artists) => {
        setRecArtistsByLocationLikes(artists)
      })
    })
  }, [])

  useEffect(() => {
    getArtistsBySimilarAttributes().then((artists) => {
      setRecArtistsByAttrs(artists)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Box sx={{ padding: '0.5rem 2rem' }}>
        {(recArtistsByLocationLikes?.length ?? 0) === 0 ? <Typography gutterBottom variant="overline">No Results :(</Typography> : (
          <Paper sx={{ padding: '0.5rem' }}>
            <Typography gutterBottom variant="h4">Artists Liked by Users in Your Country</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100% !important' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {recArtistsByLocationLikes.map((row) => (
                    <TableRow key={row.artist_id}>
                      <TableCell component="th" scope="row">
                        <Link href={`/artist/?id=${row.artist_id}`}>
                          {row.name}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
      <Box sx={{ padding: '0.5rem 2rem' }}>
        {(recArtistsByAttrs?.length ?? 0) === 0 ? <Typography gutterBottom variant="overline"> </Typography> : (
          <Paper sx={{ padding: '0.5rem' }}>
            <Typography gutterBottom variant="h4">Artists That Fit Your Attributes</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100% !important' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {recArtistsByAttrs.map((row) => (
                    <TableRow key={row.artist_id}>
                      <TableCell component="th" scope="row">
                        <Link href={`/artist/?id=${row.artist_id}`}>
                          {row.name}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </>
  )
}

export default SearchPage
