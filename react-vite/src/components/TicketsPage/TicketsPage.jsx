import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmissionsThunk } from '../../redux/admission';
import './TicketsPage.css';

function TicketsPage() {
  const dispatch = useDispatch();
  let admissions = useSelector((state) => state.admissions);
  
  
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [dateSelected, setDateSelected] = useState('');
  const [timeCheck, setTimeCheck] = useState(true);

  useEffect(() => {
    dispatch(getAdmissionsThunk());
  }, [dispatch]);

  useEffect(() => {



    if (admissions) {
        admissions = Object.values(admissions)
        console.log("ADMISSIONS HERE",admissions)
        const firstAdmissionDate = new Date(admissions[0].day);
        console.log('First Admission Date:', firstAdmissionDate);
        setCurrentMonth(firstAdmissionDate.getMonth());
        setCurrentYear(firstAdmissionDate.getFullYear());
    }
  }, [admissions]);

// if (admissions) {
//     admissions = Object.values(admissions)
//     console.log("ADMISSIONS", admissions)
//     const firstAdmissionDate = new Date(admissions[0].day);
//     console.log('First Admission Date:', firstAdmissionDate);
//     setCurrentMonth(firstAdmissionDate.getMonth());
//     setCurrentYear(firstAdmissionDate.getFullYear());
// }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = currentMonth !== null ? new Date(currentYear, currentMonth, 1).getDay() : 0;
  const daysInMonth = currentMonth !== null ? getDaysInMonth(currentMonth, currentYear) : 0;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (date) => {
    setDateSelected(date);
  };

  const getAdmissionForDate = (date) => {
    admissions = Object.values(admissions)
    return admissions?.find((admission) => new Date(admission.day).toDateString() === new Date(currentYear, currentMonth, date).toDateString());
  };

  const renderCalendarDays = () => {
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className='calendar-day empty'></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const admission = getAdmissionForDate(i);
      calendarDays.push(
        <div
          key={i}
          className={`calendar-day ${admission ? 'admission-day' : ''}`}
          onClick={() => handleDateClick(`${currentYear}-${currentMonth + 1}-${i}`)}
        >
          {i}
        </div>
      );
    }
    console.log(calendarDays)
    return calendarDays;
  };

//   if (currentMonth === null || currentYear === null) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className='tickets-page'>
      <h2>Purchase Tickets</h2>
      <div className='calendar-container'>
        <div className='calendar-header'>
          <button onClick={handlePrevMonth}>&lt;</button>
          <span>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</span>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className='calendar'>
          <div className='calendar-row'>
            {daysOfWeek.map((day) => (
              <div key={day} className='calendar-day-header'>{day}</div>
            ))}
          </div>
          <div className='calendar-row'>
            {renderCalendarDays().map((day)=>(
                <div key={day}>
                    {day}
                    </div>
            ))}
          </div>
        </div>
      </div>
      <div className='tickets-container'>
        <h3>Ticket Types</h3>
      </div>
      <div className='purchase'>
        <span>Total Price</span>
        <span>Discount</span>
        <button>Purchase</button>
      </div>
    </div>
  );
}

export default TicketsPage;
