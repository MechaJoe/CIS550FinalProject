import React, { useState, useEffect } from 'react'
import {
  Typography, TableContainer, TableRow, TableCell, TableBody, Table, Paper, Link, Box,
} from '@mui/material'
import NavBar from '../components/NavBar'
import { getUserLocation, getArtistsByLocationLikes } from '../fetcher'

function SearchPage() {
  const [recArtists, setRecArtists] = useState([])

  useEffect(() => {
    getUserLocation().then((location) => {
      getArtistsByLocationLikes(location).then((artists) => {
        setRecArtists(artists)
      })
    })
  }, [])

  return (
    <>
      <NavBar />
      <Box sx={{ padding: '0.5rem 2rem' }}>
        {(recArtists?.length ?? 0) === 0 ? <Typography gutterBottom variant="overline">No Results :(</Typography> : (
          <Paper>
            <Typography gutterBottom variant="overline">Artists Users in Your Country Like</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100% !important' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {recArtists.map((row) => (
                    <TableRow>
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
