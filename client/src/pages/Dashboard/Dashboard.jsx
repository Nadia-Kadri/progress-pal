// import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Navbar from '../../components/Navbar/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Dashboard({ checkAuth, user }) {
  const userData = user.user;
  // const [habits, setHabits] = useState();

  return (
    <>
    <Navbar checkAuth={() => checkAuth()} user={user}/>
    <Container maxWidth='md' sx={{ my: 4 }}>
      <Box>
        <Typography component='h1' variant='h4' sx={{ mb: '14px' }}>Hello, {userData.first_name}</Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Card variant='outlined' sx={{ padding: '14px' }}>
              <div>
                {format(new Date(), "MM/dd/yyyy")}
              </div>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card variant='outlined' sx={{ padding: '14px' }}>
              <div>Hi</div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
}

export default Dashboard;