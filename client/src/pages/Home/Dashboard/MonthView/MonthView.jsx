import { useState } from 'react';
import Calendar from './Calendar/Calendar';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

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
          <InputLabel>Habit</InputLabel>
          <Select
            value={selectedHabit}
            onChange={handleChange}
            label='Habit'
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