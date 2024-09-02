import { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, CircularProgress } from '@mui/material';
import DayView from './DayView/DayView';
import MonthView from './MonthView/MonthView';

function Dashboard({ user }) {
  const userData = user.user;
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserHabits = async () => {
    try {
      const response = await fetch('/api/user/habits');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setHabits(result);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => await getUserHabits())();
  }, []);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component='main'>
      <Container>
        <Typography component='h1' variant='h4' sx={{ pt: '14px' }}>Hello, {userData.first_name}!</Typography>
        <Typography variant='subtitle1' sx={{ pb: '14px' }}>Discover how tracking small habits can make a big difference</Typography>
        <Grid container spacing={1.5} justifyContent='center' sx={{ pb: '14px' }}>
          <Grid item md={4} sm={8} xs={12}>
            <DayView habits={habits} getUserHabits={getUserHabits} />
          </Grid>
          <Grid item md={8} sm={8} xs={12}>
            <MonthView habits={habits} getUserHabits={getUserHabits} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;