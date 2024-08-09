import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({ checkAuth, user }) {

  function handleClick() {
    logout();
  }

  async function logout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await checkAuth();
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/' style={{ color: 'inherit', marginRight: 'auto', display: 'flex', alignItems: 'end' }}>
          <img src='../../public/images/progresspal-2.png' alt='Home' style={{ height: '50px', width: '50px' }} />
          <Typography component='span' variant='h6' sx={{ fontWeight: 'bold' }}>ProgressPal</Typography>
        </Link>
        {user.isAuthenticated ? (
          <Button sx={{ color: '#ffffff', textTransform: 'none' }} onClick={handleClick} startIcon={<LogoutIcon />}>Sign out</Button>
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