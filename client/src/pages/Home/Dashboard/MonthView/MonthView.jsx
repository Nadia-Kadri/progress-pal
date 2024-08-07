import { useState } from 'react';
import Calendar from './Calendar';
import { Paper, Box, Grid, Typography, Divider, Tabs, Tab } from '@mui/material';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function MonthView({ habits }) {
  const [selectedHabitId, setSelectedHabitId] = useState(habits.length > 0 ? habits[0].id : null);

  const handleChange = (event, newValue) => {
    setSelectedHabitId(newValue);
  };

  // function findHabit(id) {
  //   return habits.find(habit => habit.id === id);
  // }
  
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
      <Grid container sx={{ py: 2 }}>
        <Grid item md={8} xs={12}>
          <Calendar selectedHabit={habits.find(habit => habit.id === selectedHabitId)} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Box>
            <EventAvailableTwoToneIcon /> Done in August
          </Box>
          <Box>
            <TaskAltIcon /> Total Days Done
          </Box>
          <Box>
            <AutoAwesomeMotionTwoToneIcon /> Current Streak
          </Box>
          <Box>
            <EmojiEventsTwoToneIcon /> Best Streak
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </>
  );
}

export default MonthView;