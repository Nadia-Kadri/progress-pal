import { Stack } from '@mui/material';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import IconWithText from './IconWithText';
import { parseISO, format } from 'date-fns';

function Stats({ selectedHabit, selectedDate }) {
  const sortedLogs = selectedHabit ? selectedHabit.logs.map(log => parseISO(log.log_created_at)).sort((a, b) => a - b) : [];
  // const today = new Date();

  const daysInMonth = selectedHabit ? calcDaysInMonth() : 0;
  const totalDays = selectedHabit ? selectedHabit.logs.length : 0;
  const currentStreak = 0;
  const bestStreak = 0;

  function calcDaysInMonth() {
    let daysInMonth = 0;
    for(let log of sortedLogs) {
      if((log.getFullYear() === selectedDate.getFullYear()) && (log.getMonth() === selectedDate.getMonth())) {
        daysInMonth++;
      }
    }
    return daysInMonth;
  }

  // function calcCurrentStreak() {
  //   const todayIndex = sortedLogs.find((log) => log.toDateString() === today.toDateString());
  //   if(!todayIndex) return 0;
  //   let streak = 1;
  //   for (let i = sortedLogs.indexOf(todayIndex); i > 0; i--) {
  //     if (sortedLogs[i].getTime() - sortedLogs[i - 1].getTime() === 86400000) {
  //       streak++;
  //     } else {
  //       break;
  //     }
  //   }
  //   return streak;
  // }

  // function calcBestStreak() {

  // }
  
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