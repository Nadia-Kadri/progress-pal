import { useState } from 'react';
import Calendar from './Calendar/Calendar';
import { Card, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

function MonthView({ habits }) {
  const [selectedHabit, setSelectedHabit] = useState(habits.length > 0 ? habits[0].id : '');

  const handleChange = (event) => {
    setSelectedHabit(event.target.value);
  };
  
  return (
    <>
    <Card variant='outlined' sx={{ padding: '14px', height: '400px' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center'
        }}
      >
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

      <Calendar selectedHabit={habits.find(habit => habit.id === selectedHabit)} />
    </Card>
    </>
  );
}

export default MonthView;