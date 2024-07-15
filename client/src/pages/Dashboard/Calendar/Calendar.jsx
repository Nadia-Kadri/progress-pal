import { useState } from 'react';
import './Calendar.css'; // Optional for styling

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderDaysOfWeek = () => {
    return daysOfWeek.map(day => (
      <div key={day} className='day-name'>
        {day}
      </div>
    ));
  };

  const renderDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    // Get total days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className='day empty'></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      days.push(
        <div key={day} className={`day ${isToday ? 'today' : ''}`}>{day}</div>
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
