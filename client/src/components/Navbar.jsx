import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({ checkAuth, user }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => logout();

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await checkAuth();
    } catch (err) {
      console.error(err.message);
    } finally {
      handleClose();
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/' style={{ color: 'inherit', marginRight: 'auto', display: 'flex', alignItems: 'end', textDecoration: 'none' }}>
          <img src='/images/progresspal-2.png' alt='Home' style={{ height: '50px', width: '50px' }} />
          <Typography component='span' variant='h6' sx={{ fontWeight: 'bold' }}>ProgressPal</Typography>
        </Link>
        {user.isAuthenticated ? (
          <>
          <IconButton color='inherit' onClick={handleClick}>
            <AccountCircleIcon fontSize='large' />
          </IconButton>
          <Menu id='user-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Sign out
            </MenuItem>
          </Menu>
          </>
        ) : (
          <Tooltip title='Sign in to your account'>
            <IconButton component={Link} to='/login' color='inherit'>
              <AccountCircleIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;