import { useState, useEffect } from 'react';
import Calendar from './Calendar';
import Stats from './Stats';
import { Paper, Box, Grid, Typography, Divider, Tabs, Tab } from '@mui/material';

function MonthView({ habits }) {
  const [selectedHabit, setSelectedHabit] = useState(habits.length > 0 ? habits[0] : null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  useEffect(() => {
    if (!selectedHabit && habits.length > 0) {
      setSelectedHabit(habits[0]);
    } else {
      setSelectedHabit(habits.find(habit => habit.id === selectedHabit.id));
    }
  }, [habits, selectedHabit]);

  const handleChange = (event, newValue) => {
    setSelectedHabit(habits.find(habit => habit.id === newValue));
  };
  
  return (
    <>
    <Paper elevation={3} sx={{ minHeight: '500px' }}>
      <Typography component='h2' variant='h6' align='center' sx={{ p: '5px' }}>Progress</Typography>
      <Divider />
        {selectedHabit ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Tabs
              value={selectedHabit.id}
              onChange={handleChange}
              variant='scrollable'
              scrollButtons='auto'
              aria-label='scrollable habit tabs'
              TabIndicatorProps={{
                style: {
                  backgroundColor: selectedHabit.color
                },
              }}
            >
              {habits.map(habit => (
                <Tab
                  key={habit.id}
                  label={`${habit.icon} ${habit.name}`}
                  value={habit.id}
                  sx={{ 
                    color: 'black',
                    '&.Mui-selected': {
                      color: selectedHabit.color,
                      fontWeight: 'bold'
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>
        ) : null}
      <Grid container sx={{ py: 2 }} rowSpacing={3}>
        <Grid item lg={6} md={7} xs={12} container justifyContent={{ lg: 'end', md: 'center', xs: 'center'  }} alignItems='center'>
          <Calendar
            selectedHabit={selectedHabit}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Grid>
        <Grid item lg={6} md={5} xs={12} container justifyContent={{ lg: 'center', md: 'center', xs: 'center' }} alignItems='center'>
          <Stats
            selectedHabit={selectedHabit}
            selectedDate={selectedDate}
          />
        </Grid>
      </Grid>
    </Paper>
    </>
  );
}

export default MonthView;