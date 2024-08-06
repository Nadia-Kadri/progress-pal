import { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, CircularProgress } from '@mui/material';
import DayView from './DayView/DayView';
import MonthView from './MonthView/MonthView';

function Dashboard({ user }) {
  const userData = user.user;
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUserHabits() {
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
    async function fetchUserHabits() {
      await getUserHabits();
    }
    fetchUserHabits();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Container sx={{ my: 4 }}>
      <Typography component='h1' variant='h4' sx={{ mb: '14px' }}>Hello, {userData.first_name}</Typography>
      <Grid container spacing={2}>
        <Grid item md={4} sm={12}>
          <DayView
            habits={habits}
            getUserHabits={getUserHabits}
          />
        </Grid>
        <Grid item md={8} sm={12}>
          <MonthView 
            habits={habits}
            getUserHabits={getUserHabits}
          />
        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Dashboard;