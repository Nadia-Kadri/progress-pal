import { useState } from 'react';
import Calendar from './Calendar';
import Stats from './Stats';
import { Paper, Box, Grid, Typography, Divider, Tabs, Tab } from '@mui/material';

function MonthView({ habits }) {
  const [selectedHabitId, setSelectedHabitId] = useState(habits.length > 0 ? habits[0].id : null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const handleChange = (event, newValue) => {
    setSelectedHabitId(newValue);
  };
  
  return (
    <>
    <Paper elevation={3} sx={{ minHeight: '500px' }}>
      <Typography component='h2' variant='h6' align='center' sx={{ p: '5px' }}>Progress</Typography>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Tabs value={selectedHabitId} onChange={handleChange} variant='scrollable' scrollButtons='auto' aria-label='scrollable habit tabs'>
          {habits.length > 0 ? habits.map(habit => (
            <Tab key={habit.id} label={`${habit.icon} ${habit.name}`} value={habit.id} sx={{ color: 'black' }} />
          )) : null}
        </Tabs>
      </Box>
      <Grid container sx={{ py: 2 }} rowSpacing={3}>
        <Grid item lg={6} md={7} xs={12} container justifyContent={{ lg: 'end', md: 'center', xs: 'center'  }} alignItems='center'>
          <Calendar
            selectedHabit={habits.find(habit => habit.id === selectedHabitId)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Grid>
        <Grid item lg={6} md={5} xs={12} container justifyContent={{ lg: 'center', md: 'center', xs: 'center' }} alignItems='center'>
          <Stats
            selectedHabit={habits.find(habit => habit.id === selectedHabitId)}
            selectedDate={selectedDate}
          />
        </Grid>
      </Grid>
    </Paper>
    </>
  );
}

export default MonthView;