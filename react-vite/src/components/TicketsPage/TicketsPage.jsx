// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAdmissionsThunk } from '../../redux/admission';
// import './TicketsPage.css';

// function TicketsPage() {
//   const dispatch = useDispatch();
//   let admissions = useSelector((state) => state.admissions);
  
  
//   const [currentMonth, setCurrentMonth] = useState(null);
//   const [currentYear, setCurrentYear] = useState(null);
//   const [dateSelected, setDateSelected] = useState('');
//   const [timeCheck, setTimeCheck] = useState(true);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     dispatch(getAdmissionsThunk());
//   }, [dispatch]);

//   useEffect(() => {
//     let timeout;



//     if (admissions && admissions.length) {
//         admissions = Object.values(admissions)
//         console.log("ADMISSIONS HERE",admissions)
//         const firstAdmissionDate = new Date(admissions[0].day);
//         console.log('First Admission Date:', firstAdmissionDate);
//         setCurrentMonth(firstAdmissionDate.getMonth());
//         setCurrentYear(firstAdmissionDate.getFullYear());
//         setLoading(false)
//     }else{
//         timeout = setTimeout(()=>setLoading(false),3000)
//     }
//     return ()=> clearTimeout(timeout)
//   }, [admissions]);

// // if (admissions) {
// //     admissions = Object.values(admissions)
// //     console.log("ADMISSIONS", admissions)
// //     const firstAdmissionDate = new Date(admissions[0].day);
// //     console.log('First Admission Date:', firstAdmissionDate);
// //     setCurrentMonth(firstAdmissionDate.getMonth());
// //     setCurrentYear(firstAdmissionDate.getFullYear());
// // }

//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const firstDayOfMonth = currentMonth !== null ? new Date(currentYear, currentMonth, 1).getDay() : 0;
//   const daysInMonth = currentMonth !== null ? getDaysInMonth(currentMonth, currentYear) : 0;

//   const handlePrevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };

//   const handleDateClick = (date) => {
//     setDateSelected(date);
//   };

//   const getAdmissionForDate = (date) => {
//     admissions = Object.values(admissions)
//     return admissions?.find((admission) => new Date(admission.day).toDateString() === new Date(currentYear, currentMonth, date).toDateString());
//   };

//   const renderCalendarDays = () => {
//     const calendarDays = [];
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className='calendar-day empty'></div>);
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//       const admission = getAdmissionForDate(i);
//       calendarDays.push(
//         <div
//           key={i}
//           className={`calendar-day ${admission ? 'admission-day' : ''}`}
//           onClick={() => handleDateClick(`${currentYear}-${currentMonth + 1}-${i}`)}
//         >
//           {i}
//         </div>
//       );
//     }
//     console.log(calendarDays)
//     return calendarDays;
//   };

// //   if (currentMonth === null || currentYear === null) {
// //     return <div>Loading...</div>;
// //   }
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='tickets-page'>
//       <h2>Purchase Tickets</h2>
//       <div className='calendar-container'>
//         <div className='calendar-header'>
//           <button onClick={handlePrevMonth}>&lt;</button>
//           <span>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</span>
//           <button onClick={handleNextMonth}>&gt;</button>
//         </div>
//         <div className='calendar'>
//           <div className='calendar-row'>
//             {daysOfWeek.map((day) => (
//               <div key={day} className='calendar-day-header'>{day}</div>
//             ))}
//           </div>
//           <div className='calendar-row'>
//             {renderCalendarDays().map((day,index)=>(
//                 <div key={index}>
//                     {day}
//                     </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className='tickets-container'>
//         <h3>Ticket Types</h3>
//       </div>
//       <div className='purchase'>
//         <span>Total Price</span>
//         <span>Discount</span>
//         <button>Purchase</button>
//       </div>
//     </div>
//   );
// }

// export default TicketsPage;


import React, { useState, useEffect } from 'react';
import './TicketsPage.css'

const TicketsPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

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
        const dateToCheck = new Date(year, month, day);
        const isToday = dateToCheck.toDateString() === currentDate.toDateString();
        const isCurrentOrFutureDay = dateToCheck >= currentDate || isToday;
      calendarDays.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer ${isCurrentOrFutureDay ? 'bg-blue-500': 'past'}`}
          onClick={isCurrentOrFutureDay? () => handleDayClick(day): undefined}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString(undefined, options);
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
