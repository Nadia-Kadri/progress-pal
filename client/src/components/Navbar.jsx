import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

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
          <>
          <Link to='/login' style={{ color: 'inherit', marginRight: '1rem' }}>Sign in</Link>
          <Link to='/register' style={{ color: 'inherit' }}>Sign up</Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;