import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Navbar from '../../components/Navbar/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

function Dashboard({ checkAuth, user }) {
  const userData = user.user;
  const [habits, setHabits] = useState([]);

  async function todaysHabits(id) {
    const response = await fetch(`/api/users/${id}/habits`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    setHabits(result);
  }

  useEffect(() => {
    async function fetchTodaysHabits() {
      await todaysHabits(userData.id);
    }
    fetchTodaysHabits();
  }, []);

  async function completeHabit(habit_id) {
    try {
      const response = await fetch('/api/habit/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habit_id })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await todaysHabits(userData.id);
    } catch(err) {
      console.error(err.message);
    }
  }

  async function unCompleteHabit(log_id) {
    try {
      const response = await fetch(`/api/habit/log/${log_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ log_id })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await todaysHabits(userData.id);
    } catch(err) {
      console.error(err.message);
    }
  }

  return (
    <>
    <Navbar checkAuth={() => checkAuth()} user={user}/>
    <Container maxWidth='md' sx={{ my: 4 }}>
      <Box>
        <Typography component='h1' variant='h4' sx={{ mb: '14px' }}>Hello, {userData.first_name}</Typography>
        <Grid container spacing={2}>
          <Grid item md={6} sm={12} xs={12}>
            <Card variant='outlined' sx={{ padding: '14px' }}>
              <div>
                {format(new Date(), "EEEE, MMM do")}
              </div>
              {habits.map((habit) => {
                return (
                  <div key={habit.id}>
                    <span>{habit.icon}</span>
                    <span>{habit.name}</span>
                    <Checkbox
                      checked={habit.log_id ? true : false}
                      onChange={habit.log_id ? () => unCompleteHabit(habit.log_id) : () => completeHabit(habit.id)}
                    />
                  </div>
                );
              })}
            </Card>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Card variant='outlined' sx={{ padding: '14px' }}>
              
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
}

export default Dashboard;