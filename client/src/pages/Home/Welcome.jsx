import { Link } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';

function Welcome() {
  return ( 
    <>
    <Container maxWidth='md' sx={{ my: 4 }}>
      <Box>
        <Typography component='h1' variant='h4'>Welcome to Progresspal!</Typography>
        <Button component={Link} to="/login" variant="contained" color="primary" sx={{ marginRight: '1rem' }}>Login</Button>
        <Button component={Link} to="/register" variant="outlined" color="primary">Register</Button>
      </Box>
    </Container>
    </>
  );
}

export default Welcome;