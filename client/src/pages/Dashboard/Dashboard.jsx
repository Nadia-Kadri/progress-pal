import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import DayView from './DayView/DayView';
import MonthView from './MonthView/MonthView';

function Dashboard({ checkAuth, user }) {
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
    <Navbar checkAuth={() => checkAuth()} user={user}/>
    <Container maxWidth='md' sx={{ my: 4 }}>
      <Box>
        <Typography component='h1' variant='h4' sx={{ mb: '14px' }}>Hello, {userData.first_name}</Typography>
        <Grid container spacing={2}>
          <Grid item md={6} sm={6} xs={12}>
            <DayView
              habits={habits}
              getUserHabits={() => getUserHabits()}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <MonthView />
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
}

export default Dashboard;