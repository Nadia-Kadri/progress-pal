import { useState } from 'react';
import { format } from 'date-fns';
import { Box, Paper, Checkbox, Typography, IconButton, Divider, Tooltip } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
    <Paper elevation={3} sx={{ height: '500px' }}>
      <Typography component='h2' sx={{ p: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography component='span' variant='h6' mr='4px'>Daily Log</Typography>
        <Tooltip title='Mark today&#39;s habits as complete with the checkbox, and use the arrows to log past completions.' placement='right'>
          <InfoOutlinedIcon fontSize='small'/>
        </Tooltip>
      </Typography>
      <Divider />
      {habits.length > 0 ? (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', p: '5px' }}>
          <IconButton onClick={handleBeforeClick}><NavigateBeforeIcon /></IconButton>
          <Typography>{format(selectedDate, "EEEE, MMM do")}</Typography>
          <IconButton onClick={handleNextClick}><NavigateNextIcon /></IconButton>
        </Box>
        <Box sx={{ height: '364px', overflow: 'auto', px: 3 }}>
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
                    mb: '14px',
                    overflow: 'auto',
                    opacity: selectedDate > today ? 0.5 : 1, 
                    pointerEvents: selectedDate > today ? 'none' : 'auto' 
                  }}
                >
                  <Box>
                    <Typography>
                      <Typography component='span' sx={{ fontSize: '18px', mr: '4px' }}>{habit.icon}</Typography>
                      <Typography component='span'>{habit.name}</Typography>
                    </Typography>
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
              )}
            })}
        </Box>
        </>
      ) : (
        <Box sx={{ height: '414px', overflow: 'auto', px: 3 }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='body2' align='center' gutterBottom>It look&#39;s like you dont have any habits yet.</Typography>
            <Typography variant='body2' align='center'>Start tracking your progress by creating a new habit. Click the button below to get started!</Typography>
          </Box>
        </Box>
      )}

      <Divider />
      <CreateHabitModal getUserHabits={getUserHabits} setSelectedDate={setSelectedDate}/>
    </Paper>
    </>
  );
}

export default DayView;