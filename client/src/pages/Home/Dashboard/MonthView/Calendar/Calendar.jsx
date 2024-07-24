import { useState } from 'react';
import { parseISO } from 'date-fns';
import './Calendar.css';

const Calendar = ({ selectedHabit }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getLogDates = () => {
    if (!selectedHabit || !selectedHabit.logs) return [];
    return selectedHabit.logs.map(log => parseISO(log.log_created_at));
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // first day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // total days in the month
    return { firstDay, daysInMonth };
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map(day => (
      <div key={day} className='day-name'>
        {day}
      </div>
    ));
  };

  const renderDaysInMonth = () => {
    const { firstDay, daysInMonth } = getDaysInMonth();
    const logDates = getLogDates();
    const today = new Date();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className='day empty'></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = today.toDateString() === currentDay.toDateString();
      const isCompleted = logDates.some(logDate =>
        logDate.toDateString() === currentDay.toDateString()
      );

      days.push(
        <div key={day} style={{ backgroundColor: isCompleted ? selectedHabit.color : '#FFFFFF' }} className={`day ${isToday ? 'today' : ''}`}>{day}</div>
      );
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  return (
    <div className='calendar'>
      <div className='header'>
        <button onClick={goToPreviousMonth}>Previous</button>
        <div className='current-month'>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <div className='days-of-week'>
        {renderDaysOfWeek()}
      </div>
      <div className='days'>
        {renderDaysInMonth()}
      </div>
    </div>
  );
};

export default Calendar;
