import { useState } from 'react';
import Calendar from './Calendar/Calendar';
import { Paper, Select, MenuItem, FormControl, InputLabel, Box, Grid } from '@mui/material';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function MonthView({ habits }) {
  const [selectedHabit, setSelectedHabit] = useState(habits.length > 0 ? habits[0].id : '');

  const handleChange = (event) => {
    setSelectedHabit(event.target.value);
  };
  
  return (
    <>
    <Paper elevation={3} sx={{ padding: '14px', height: '500px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='habit-select-label' htmlFor='habit-select'>Habit</InputLabel>
          <Select
            labelId='habit-select-label'
            id='habit-select'
            value={selectedHabit}
            onChange={handleChange}
          >
            {habits.length > 0 ? habits.map(habit => (
              <MenuItem key={habit.id} value={habit.id}>{habit.icon} {habit.name}</MenuItem>
            )) : null}
          </Select>
        </FormControl>
      </Box>
      <Grid container>
        <Grid item sm={8}>
          <Calendar selectedHabit={habits.find(habit => habit.id === selectedHabit)} />
        </Grid>
        <Grid item sm={4}>
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