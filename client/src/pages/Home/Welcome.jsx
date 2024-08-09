import { Link } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';

function Welcome() {
  return ( 
    <Box component='main'>
      <Container>
        <img src='../../public/images/progresspal-4.png' alt='Welcome' style={{ height: '350px' }} />
        <Box>
          <Typography component='h1' variant='h2'>Let&#39;s Build Better Habits</Typography>
          <Typography component='h2' variant='h6' mb={1}>A platform for tracking and achieving your goals</Typography>
          <Button component={Link} to="/register" variant="contained" color="primary" sx={{ marginRight: '1rem' }}>Get Started</Button>
          <Button component={Link} to="/login" variant="outlined" color="primary">Login</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Welcome;