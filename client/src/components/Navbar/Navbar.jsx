import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

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
          <>
          <Link to='/dashboard' style={{ color: 'inherit', marginRight: '1rem' }}>Dashboard</Link>
          <Button size='small' variant='contained' onClick={handleClick}>Logout</Button>
          </>
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