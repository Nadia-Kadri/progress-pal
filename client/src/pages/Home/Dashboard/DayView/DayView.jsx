import { useState } from 'react';
import { format } from 'date-fns';
import { Box, Paper, Checkbox, Typography, IconButton } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CreateHabitModal from '../CreateHabitModal/CreateHabitModal';


function DayView({ habits, getUserHabits }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  async function completeHabit(habit_id, created_at) {
    try {
      const response = await fetch('/api/habit/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habit_id, created_at })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await getUserHabits();
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
      await getUserHabits();
    } catch(err) {
      console.error(err.message);
    }
  }

  function handleBeforeClick() {
    let newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  }

  function handleNextClick() {
    let newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  }

  return (
    <>
    <Paper elevation={3} sx={{ padding: '14px', height: '500px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton onClick={handleBeforeClick}><NavigateBeforeIcon /></IconButton>
        <Typography>{format(selectedDate, "EEEE, MMM do")}</Typography>
        <IconButton onClick={handleNextClick}><NavigateNextIcon /></IconButton>
      </Box>
      {habits.length === 0 ? <Typography>No current habits</Typography> : (
        <Box sx={{ height: '395.5px', overflow: 'auto' }}>
          {habits.map(habit => {
            const completedLog = habit.logs.find(log => log.log_created_at === format(selectedDate, 'yyyy-MM-dd'));
            const habitStartDate = new Date(habit.created_at);
            const habitEndDate = new Date(habit.expired_at);
            if(habitStartDate.getTime() <= selectedDate.getTime() && habitEndDate.getTime() >= selectedDate.getTime()) {
              return (
                <Box
                  key={habit.id}
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: `2px solid ${habit.color}`,
                    paddingTop: '14px',
                    overflow: 'auto',
                    opacity: selectedDate > today ? 0.5 : 1, 
                    pointerEvents: selectedDate > today ? 'none' : 'auto' 
                  }}
                >
                  <Box>
                    <Typography>{habit.icon} {habit.name}</Typography>
                    <Typography sx={{ fontSize: '.8rem', paddingLeft: '14px' }}>{habit.amount} {habit.unit}</Typography>
                  </Box>
                  <Checkbox
                    id={`checkbox-${habit.id}`}
                    name={`checkbox-${habit.id}`}
                    checked={completedLog ? true : false}
                    onChange={completedLog ? () => unCompleteHabit(completedLog.log_id) : () => completeHabit(habit.id, format(selectedDate, 'yyyy-MM-dd'))}
                    sx={{ padding: '0', color: habit.color, '& .MuiSvgIcon-root': { color: habit.color} }}
                  />
                </Box>
              )
            }
          })}
        </Box>
      )}
      <CreateHabitModal getUserHabits={getUserHabits} setSelectedDate={setSelectedDate}/>
    </Paper>
    </>
  );
}

export default DayView;