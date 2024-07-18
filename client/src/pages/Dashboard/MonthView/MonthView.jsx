import { useState } from 'react';
import Calendar from './Calendar/Calendar';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';

function MonthView() {
  // const [selectedHabit, setSelectedHabit] = useState();
  const [age, setAge] = useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Calendar />
      
    </Card>
    </>
  );
}

export default MonthView;