import { Stack } from '@mui/material';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import IconWithText from './IconWithText';
import { parseISO, format, differenceInDays } from 'date-fns';

function Stats({ selectedHabit, selectedDate }) {
  const sortedLogs = selectedHabit ? selectedHabit.logs.map(log => parseISO(log.log_created_at)).sort((a, b) => a - b) : [];
  const today = new Date();

  const daysInMonth = selectedHabit ? calcDaysInMonth() : 0;
  const totalDays = selectedHabit ? selectedHabit.logs.length : 0;
  const currentStreak = selectedHabit ? calcCurrentStreak() : 0;
  const bestStreak = selectedHabit ? calcBestStreak() : 0;

  function calcDaysInMonth() {
    let daysInMonth = 0;
    for(let log of sortedLogs) {
      if((log.getFullYear() === selectedDate.getFullYear()) && (log.getMonth() === selectedDate.getMonth())) {
        daysInMonth++;
      }
    }
    return daysInMonth;
  }

  function calcCurrentStreak() {
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const yesterdayIndex = sortedLogs.findIndex((log) => log.toDateString() === yesterday.toDateString());
    const todayIndex = sortedLogs.findIndex((log) => log.toDateString() === today.toDateString());
  
    if(todayIndex < 0 && yesterdayIndex < 0) return 0;

    let streak = todayIndex >= 0 ? 1 : 0;
    streak += yesterdayIndex >= 0 ? 1 : 0;

    for(let i = yesterdayIndex; i > 0; i--) {
      if (differenceInDays(sortedLogs[i], sortedLogs[i - 1]) === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  function calcBestStreak() {
    if(sortedLogs.length === 0) return 0;

    let bestStreak = 1;
    let currentStreak = 1;
    
    for(let i = 1; i < sortedLogs.length; i++) {
      if(differenceInDays(sortedLogs[i], sortedLogs[i - 1]) === 1) {
        currentStreak++;
      } else {
        bestStreak = Math.max(bestStreak, currentStreak);
        currentStreak = 1;
      }
    }

    return Math.max(bestStreak, currentStreak);
  }
  
  return (
    <>
    <Stack direction='row'>
      <IconWithText icon={EventAvailableTwoToneIcon} color='#2196f3' days={daysInMonth} text={`Done in ${format(selectedDate, 'MMMM')}`} />
      <IconWithText icon={TaskAltIcon} color='#4caf50' days={totalDays} text='Total Done' />
    </Stack>
    <Stack direction='row'>
      <IconWithText icon={AutoAwesomeMotionTwoToneIcon} color='#9575cd' days={currentStreak} text='Current Streak' />
      <IconWithText icon={EmojiEventsTwoToneIcon} color='#ff9800' days={bestStreak} text='Best Streak' />
    </Stack>
    </>
  )
}

export default Stats;