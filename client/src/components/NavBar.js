import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function NavBar() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const linkStyle = {
    minWidth: '100px',
    fontFamily: 'Roboto, Arial',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const logout = async () => {
    await axios.post('http://localhost:8080/logout', {}, { withCredentials: true })
    history.push('/login')
  }
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'center',
        width: '100%',
        padding: '1rem',
      }}
      >
        <Link sx={linkStyle} href="/" underline="hover">Search</Link>
        <Link sx={linkStyle} href="/recs" underline="hover">Recommended</Link>
        <Link sx={linkStyle} href="/heatmap" underline="hover">Heatmap</Link>
        <Tooltip title="Me">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { history.push('/me') }}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { history.push('/edit') }}>
          Edit Information
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
