import { Typography, Box, Divider, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { parseISO } from 'date-fns';

const Calendar = ({ selectedHabit, selectedDate, setSelectedDate }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getLogDates = () => {
    if (!selectedHabit || !selectedHabit.logs) return [];
    return selectedHabit.logs.map(log => parseISO(log.log_created_at));
  }

  const renderDaysOfWeek = () => {
    return daysOfWeek.map(day => (
      <Box key={day} sx={{ textAlign: 'center', py: 1 }}>{day}</Box>
    ));
  };

  const renderDaysInMonth = () => {
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay(); // first day of the month; Sun - Sat; 0 - 6
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate(); // total days in the month
    const logDates = getLogDates();
    const today = new Date();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ height: '45px' }}></Box>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const isToday = today.toDateString() === currentDay.toDateString();
      const isCompleted = logDates.some(logDate =>
        logDate.toDateString() === currentDay.toDateString()
      );

      days.push(
        <Box key={`day-${day}`} sx={{ height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{
              width: '40px',
              height: '40px',
              backgroundColor: isCompleted ? selectedHabit.color : null,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <Typography>{day}</Typography>
            {isToday && <Box sx={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'black' }} />}
          </Box>
        </Box>
      );
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  return (
    <Box sx={{ width: '317px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
        <IconButton onClick={goToPreviousMonth}><NavigateBeforeIcon /></IconButton>
        <Typography variant='body1'>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</Typography>
        <IconButton onClick={goToNextMonth}><NavigateNextIcon /></IconButton>
      </Box>
      <Divider />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 45px)' }}>
        {renderDaysOfWeek()}
        {renderDaysInMonth()}
      </Box>
    </Box>
  );
};

export default Calendar;
