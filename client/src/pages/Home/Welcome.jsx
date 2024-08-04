import { Link } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';

function Welcome() {
  return ( 
    <>
    <Container maxWidth='md' sx={{ my: 4 }}>
      <Box>
        <h1>Welcome to Progresspal!</h1>
        <Button component={Link} to="/login" variant="contained" color="primary" sx={{ marginRight: '1rem' }}>Login</Button>
        <Button component={Link} to="/register" variant="outlined" color="primary">Register</Button>
      </Box>
    </Container>
    </>
  );
}

export default Welcome;