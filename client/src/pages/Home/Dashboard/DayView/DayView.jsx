import { useState } from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import CreateHabitModal from '../CreateHabitModal/CreateHabitModal';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
    <Card
      variant='outlined'
      sx={{ padding: '14px', height: '400px' }}>
      <div>
        <IconButton onClick={handleBeforeClick}>
          <NavigateBeforeIcon />
        </IconButton>
        
        {format(selectedDate, "EEEE, MMM do")}
        <IconButton onClick={handleNextClick}>
          <NavigateNextIcon />
        </IconButton>
        
      </div>
      {habits.length === 0 ? (
        <Typography>No current habits</Typography>
      ) : (
        habits.map((habit) => {
          const completedLog = habit.logs.find(log => log.log_created_at === format(selectedDate, 'yyyy-MM-dd'));
          const habitStartDate = new Date(habit.created_at);
          const habitEndDate = new Date(habit.expired_at);
          if (habitStartDate.getTime() <= selectedDate.getTime() && habitEndDate.getTime() >= selectedDate.getTime()) {
            return (
              <Box
                key={habit.id}
                sx={{ 
                  paddingTop: '14px',
                  opacity: selectedDate > today ? 0.5 : 1, 
                  pointerEvents: selectedDate > today ? 'none' : 'auto' 
                }}
              >
                <span>{habit.icon}</span>
                <span>{habit.name}</span>
                <Checkbox
                  checked={completedLog ? true : false}
                  onChange={completedLog ? () => unCompleteHabit(completedLog.log_id) : () => completeHabit(habit.id, format(selectedDate, 'yyyy-MM-dd'))}
                  sx={{ padding: '0', color: habit.color, '& .MuiSvgIcon-root': { color: habit.color} }}
                />
                <Typography sx={{ fontSize: '.8rem', paddingLeft: '14px', color: habit.color }}>{habit.amount} {habit.unit}</Typography>
              </Box>
            );
          }
        }))
      }
      <CreateHabitModal getUserHabits={getUserHabits} setSelectedDate={setSelectedDate}/>
    </Card>
    </>
  );
}

export default DayView;