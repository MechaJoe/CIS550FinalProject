import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function SearchPage() {
  const [searchType, setSearchType] = useState('')
  return (
    <FormControl fullWidth>
      <InputLabel id="search-type-label">Search By</InputLabel>
      <Select
        labelId="search-type-label"
        id="demo-simple-select"
        value={searchType}
        label="Search By"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <MenuItem value="song">Song</MenuItem>
        <MenuItem value="artist">Artist</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SearchPage

// export default function SearchPage() {
//   return (
//     <Box
//       sx={{
//         width: '80%',
//         justify: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Typography variant="h1" component="h2">
//         Music Bar!
//       </Typography>
//       <TextField fullWidth label="song or artist name..." id="search" />
//     </Box>
//   )
// }
