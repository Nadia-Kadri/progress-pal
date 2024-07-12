import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Home({ checkAuth, user }) {
  return (
    <>
    <Navbar checkAuth={() => checkAuth()} user={user} />
    <Container maxWidth='md' sx={{ my: 4 }}>
      <Box>
        <h1>Welcome to Progresspal!</h1>
        {!user.isAuthenticated ? (
          <>
          <Button component={Link} to="/login" variant="contained" color="primary" sx={{ marginRight: '1rem' }}>Login</Button>
          <Button component={Link} to="/register" variant="outlined" color="primary">Register</Button>
          </>
        ) : null}
      </Box>
    </Container>
    </>
  );
}

export default Home;