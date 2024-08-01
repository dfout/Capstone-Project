
import React, { useState, useEffect } from 'react';
import './TicketsPage.css'

const TicketsPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [calendar, setCalendar] = useState('')

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth, selectedDate]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
      const generateCalendar = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();
    
        const calendarDays = [];
    
        for (let i = 0; i < firstDayOfWeek; i++) {
          calendarDays.push(<div key={`empty-${i}`} />);
        }
        const currentDate = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            // check if the currently admitted == max_admissions 
            const dateToCheck = new Date(year, month, day);
            const isToday = dateToCheck.toDateString() === currentDate.toDateString();
            const isCurrentOrFutureDay = dateToCheck >= currentDate || isToday;
            console.log("Date to check",dateToCheck, "SELECTED DAY", selectedDate)
            const isSelectedDay = selectedDate && dateToCheck.toDateString() === selectedDate;
            console.log("isSelected day: ",isSelectedDay, "date to check:",dateToCheck.toLocaleDateString())
            console.log("Selected Day", selectedDate)
          calendarDays.push(
            <div
              key={day}
              className={`text-center py-2 border cursor-pointer ${isCurrentOrFutureDay ? 'bg-blue-500': 'past'}
             ${isSelectedDay ? 'bg-green-500 text-white' : ''}`}
              onClick={isCurrentOrFutureDay? () => handleDayClick(day): undefined}
            >
              {day}
            </div>
          );
        }
        // setCalendar(calendarDays)
        return calendarDays;
        // set it into the []
      };


  const handleDayClick = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    
    setSelectedDate(selected)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selected.toLocaleDateString(undefined, options);
    setSelectedDate(formattedDate);
    setModalVisible(true);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
            <button className="text-white" onClick={handlePrevMonth}>Previous</button>
            <h2 className="text-white">{monthNames[currentMonth]} {currentYear}</h2>
            <button className="text-white" onClick={handleNextMonth}>Next</button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center font-semibold">{day}</div>
            ))}
            {generateCalendar(currentYear, currentMonth)}
          </div>
        </div>
      </div>

      {modalVisible && (
        <div id="myModal" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Selected Date</p>
                <button className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring" onClick={handleCloseModal}>✕</button>
              </div>
              <div className="text-xl font-semibold">{selectedDate}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
