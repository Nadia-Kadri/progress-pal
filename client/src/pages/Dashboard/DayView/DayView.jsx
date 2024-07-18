import { useState } from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import CreateHabitModal from '../CreateHabitModal/CreateHabitModal';

function DayView({ habits, getUserHabits }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  async function completeHabit(habit_id) {
    try {
      const response = await fetch('/api/habit/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habit_id })
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

  return (
    <>
    <Card variant='outlined' sx={{ padding: '14px', height: '400px' }}>
      <div>
        {format(selectedDate, "EEEE, MMM do")}
      </div>
      {habits.map((habit) => {
        const completedLog = habit.logs.find(log => log.log_created_at === format(selectedDate, 'yyyy-MM-dd'));
        return (
          <Box key={habit.id} sx={{ paddingTop: '14px' }}>
            <span>{habit.icon}</span>
            <span>{habit.name}</span>
            <Checkbox
              checked={completedLog ? true : false}
              onChange={completedLog ? () => unCompleteHabit(completedLog.log_id) : () => completeHabit(habit.id)}
              sx={{ padding: '0', color: habit.color, '& .MuiSvgIcon-root': { color: habit.color} }}
            />
            <Typography sx={{ fontSize: '.8rem', paddingLeft: '14px', color: habit.color }}>{habit.amount} {habit.unit}</Typography>
          </Box>
        );
      })}
      <CreateHabitModal getUserHabits={() => getUserHabits()} />
    </Card>
    </>
  );
}

export default DayView;