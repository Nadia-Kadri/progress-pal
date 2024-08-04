import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

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
        <Link to='/' style={{ color: 'inherit', marginRight: 'auto' }}>Home</Link>
        {user.isAuthenticated ? (
          <Button size='small' sx={{ color: '#ffffff' }} onClick={handleClick}>Logout</Button>
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