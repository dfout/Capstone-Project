import { useState, useEffect } from "react";
import "./TicketsPage.css";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import OpenModalButton from "../OpenModalButton";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import {useModal} from '../../context/Modal'
import { getAdmissionsThunk, purchaseAdmissionsThunk } from "../../redux/admission";
import { useDispatch } from "react-redux";

const TicketsPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // const [calendar, setCalendar] = useState("");
  const [adultQuantity, setAdultQuantity] = useState(0);
  const [seniorQuantity, setSeniorQuantity] = useState(0);
  const [disQuantity, setDisQuantity] = useState(0);
  const [studentQuantity, setStudentQuantity] = useState(0);
  const [childQuantity, setChildQuantity] = useState(0);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [isSoldOut, setIsSoldOut] = useState(false)
  const [maxAdmin, setMaxAdmin] = useState(5000000)
  const [isTooMany, setIsTooMany] = useState(false)
  const [tooMany, setTooMany] = useState(0)
  
  const sessionUser = useSelector((state)=> state.session.user)
  const admissions = useSelector((state)=>state.admissions)
  // console.log("ADMISSIONS", Object.values(admissions))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const closeMenu = useModal()

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth, selectedDate]);

  // From the backend, get all the admissions
  // Track the user's selected date
  // if the user's selected date exists in the state obj, 
  // then key into that obj
  // grab out the information about max_admissions
  // make sure the totalQuantity of the current user does not exceed the leftover max_admissions

  // If the users' selected date does not exist in the state object
  // Then, upon submission, create a new admission instance. 

  useEffect(()=>{
    dispatch(getAdmissionsThunk())
  }, [dispatch])

  useEffect(()=>{

    console.log(totalQuantity)
    if(totalQuantity > maxAdmin){
      setIsTooMany(true)
      setTooMany(maxAdmin)
      
    }else{
      setIsTooMany(false)
    }
  },[selectedDate,totalQuantity])

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const cannotPurchaseAmt = isTooMany || isSoldOut

  const handleSelect = () =>{

    // a date has been selected by a user
    // make sure the date is formatted the same as dates in the database
    const parsedDate = new Date(selectedDate)
    const year = parsedDate.getFullYear()
    console.log("YEAR", year)
    // See if that date exists in the admissions state
    let admissionsList = Object.values(admissions)
    //Organize the data better so that looking through it is much easier. Could organize by year, then month, then day. With key value pairs. 

    


    //if the max_admissions == 0, then: 
      setIsSoldOut(false)
      modalVisible(false)

  }

  const handleDayClick = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    const year = selected.getFullYear()
    console.log("YEAR", year)
    const month = selected.getMonth() + 1
    console.log("MONTH:",month)
    const date = selected.getDate()
    console.log("DAte",date)

    // see if it exists in state: 
    //! what if two users create a new instance? Check the backend just in case? and or have some handling in the front end where it handles this. But I think it might be okay becasue it will just overwrite the newest information I think. 

    if (admissions[year] && admissions[year][month] && admissions[year][month][date]){
      const max = admissions[year][month][date].max_admissions
      if (max==0){
        setIsSoldOut(true)
      }else{
        setMaxAdmin(max)
      }
    }

    setSelectedDate(selected);
  
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = selected.toLocaleDateString(undefined, options);
  
    setSelectedDate(formattedDate);
    setModalVisible(true);
  };
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
      // console.log("Date to check", dateToCheck, "SELECTED DAY", selectedDate);
      const isSelectedDay =
        selectedDate && dateToCheck.toDateString() === selectedDate;
      // console.log(
      //   "isSelected day: ",
      //   isSelectedDay,
      //   "date to check:",
      //   dateToCheck.toLocaleDateString()
      // );
      // console.log("Selected Day", selectedDate);
      calendarDays.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer ${
            isCurrentOrFutureDay ? "bg-blue-500" : "past"
          }
             ${isSelectedDay ? "bg-green-500 text-white" : ""}`}
          onClick={isCurrentOrFutureDay ? () => handleDayClick(day) : undefined}
        >
          {day}
        </div>
      );
    }
    // setCalendar(calendarDays)
    return calendarDays;
    // set it into the []
  };



  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAdultClick = (operation) => {
    let currQuantity = adultQuantity;
    let total = totalQuantity

    if (operation == "plus") {
      setAdultQuantity(currQuantity + 1);
      setTotalPrice(totalPrice + 30)
      setCheckoutModal(true);
      
      setTotalQuantity(total+ 1)
      
    } else {
      setAdultQuantity(currQuantity - 1);
      setTotalPrice(totalPrice - 30)
      setTotalQuantity(total - 1)
    }
    // if (adultQuantity!= 0){
    //   setCheckoutModal(true)
    // }else{
    //   setCheckoutModal(false)
    // }
  };

  const handleSeniorClick = (operation) => {
    let currQuantity = seniorQuantity;
    let total = totalQuantity
    if (operation == "plus") {
      setSeniorQuantity(currQuantity + 1);
      setTotalPrice(totalPrice + 22)
      setCheckoutModal(true);
      setTotalQuantity(total + 1)
    } else {
      setSeniorQuantity(currQuantity - 1);
      setTotalPrice(totalPrice - 22)
      setTotalQuantity(total - 1)
    }
  };

  const handleDisClick = (operation) => {
    let currQuantity = disQuantity;
    let total = totalQuantity
    if (operation == "plus") {
      setDisQuantity(currQuantity + 1);
      setTotalPrice(totalPrice + 22)
      setCheckoutModal(true);
      setTotalQuantity(total + 1)
    } else {
      setDisQuantity(currQuantity - 1);
      setTotalPrice(totalPrice - 22)
      setTotalQuantity(total - 1)
    }
  };

  const handleStudentClick = (operation) => {
    let currQuantity = studentQuantity;
    let total = totalQuantity

    if (operation == "plus") {
      setStudentQuantity(currQuantity + 1);
      setTotalPrice(totalPrice + 17)
      setCheckoutModal(true);
      setTotalQuantity(total + 1)
    } else {
      setStudentQuantity(currQuantity - 1);
      setTotalPrice(totalPrice - 17)
      setTotalQuantity(totalQuantity - 1)
    }
  };

  const handleChildClick = (operation) => {
    let currQuantity = childQuantity;
    let total = totalQuantity
    if (operation == "plus") {
      setChildQuantity(currQuantity + 1);
      setCheckoutModal(true);
      setTotalQuantity(total + 1)
    } else {
      setChildQuantity(currQuantity - 1);
      setTotalQuantity(total - 1)
    }
  };


  // const handleSubmit = async() =>{
  //   // const newPurchase = {
  //   //   admission_id:
  //   //   user_id: 
  //   //   total_price:
  //   //   ticket_quantity:
  //   //   member_discount:
  //   // }
  //   const response = await dispatch(purchaseAdmissionsThunk(newPurchase))
  //   // wait for the purchase id:
  //   // then check each type quantity
  //   // if there is a quantity for a type
  //   // create an object for each type that has a quantity:
  //   // if (response.id){
  //   //   if (adultQuantity!= 0){
  //   //     const 
  //   //   }

  //   // }
  // }
  console.log(sessionUser, "SESSION")
  console.log("SELECTED", selectedDate)

  const handleCheckout = async() =>{
    // need to query for the admission information
    // if (!sessionUser){
    //   navigate('/login')
    // }
  const parsedDate = new Date(selectedDate)

  const formattedDate = parsedDate.toUTCString()
  console.log(formattedDate)
  // formatted date is the correct format. 
      const newPurchase = {
        user_id: sessionUser.id,
        total_price: totalPrice, 
        ticket_quantity: totalQuantity,
      
      }
      // "Friday, August 23, 2024"
      // instead of 
      

      const response = await dispatch(purchaseAdmissionsThunk(newPurchase, formattedDate))
       
      console.log("RESPONSE",response)

      //dispatch to the backend 

      console.log(newPurchase)
  }

  console.log(maxAdmin)
  console.log(isTooMany, "TOOMANY")

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
              <button className="text-white" onClick={handlePrevMonth}>
                Previous
              </button>
              <h2 className="text-white">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button className="text-white" onClick={handleNextMonth}>
                Next
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 p-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-semibold">
                  {day}
                </div>
              ))}
              {generateCalendar(currentYear, currentMonth)}
            </div>
          </div>
        </div>
        <div className='selected-date-info'>


        {isSoldOut &&(
          <div style={{"color":"red"}}>Sorry, this day is sold out.</div>
        )}
        {modalVisible && !isSoldOut && (
          
          <div
            id="myModal"
            className="modal fixed inset-0 flex items-center justify-center z-50"
          >

            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Selected Date</p>
                  <button
                    className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring"
                    onClick={handleCloseModal}
                  >
                    ✕
                  </button>
                </div>
                <div className="text-xl font-semibold">{selectedDate}</div>
                {isTooMany && tooMany && (
          <div id='only'>Sorry, looks like there are only {tooMany} tickets left for this day</div>
        )}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      {sessionUser ? (

      <div>
        <h2>Select Tickets</h2>
        <p>
          Tickets include admission to all galleries and special exhibitions
        </p>
        <div className='ticket-purchase'>
        <div id="tickets-form">
          <div className="ticket-row">
            <div className="ticket-left">
              <span className="ticket-type">Adult</span>
            </div>
            <div className="ticket-right">
              <span>$30</span>
              <button
                className="quantity-button"
                onClick={() => handleAdultClick("minus")}
                disabled={!adultQuantity}
              >
                <FaMinus />
              </button>
              <span>{adultQuantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleAdultClick("plus")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="ticket-row">
            <div className="ticket-left">
              <span className="ticket-type">Senior</span>
              <span>65 and older with ID</span>
            </div>
            <div className="ticket-right">
              <span>$22</span>
              <button
                className="quantity-button"
                onClick={() => handleSeniorClick("minus")}
                disabled={!seniorQuantity}
              >
                <FaMinus />
              </button>
              <span>{seniorQuantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleSeniorClick("plus")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="ticket-row">
            <div className="ticket-left">
              <span className="ticket-type">Visitor with disability</span>
              <span>
                Free admission for a care partner accompanying a visitor with a
                disability
              </span>
            </div>
            <div className="ticket-right">
              <span>$22</span>
              <button
                className="quantity-button"
                onClick={() => handleDisClick("minus")}
                disabled={!disQuantity}
              >
                <FaMinus />
              </button>
              <span>{disQuantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleDisClick("plus")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="ticket-row">
            <div className="ticket-left">
              <span className="ticket-type">Student</span>
              <span>Full time with ID, including international students</span>
            </div>
            <div className="ticket-right">
              <span>$17</span>
              <button
                className="quantity-button"
                onClick={() => handleStudentClick("minus")}
                disabled={!studentQuantity}
              >
                <FaMinus />
              </button>
              <span>{studentQuantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleStudentClick("plus")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="ticket-row">
            <div className="ticket-left">
              <span className="ticket-type">Child</span>
              <span>16 and under</span>
            </div>
            <div className="ticket-right">
              <span>$0</span>
              <button
                className="quantity-button"
                onClick={() => handleChildClick("minus")}
                disabled={!childQuantity}
              >
                <FaMinus />
              </button>
              <span>{childQuantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleChildClick("plus")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      <div className='modal-cont'>
        {checkoutModal &&
        (adultQuantity ||
          studentQuantity ||
          seniorQuantity ||
          disQuantity ||
          childQuantity) ? (
          <div className="ticket-checkout-modal">
            {adultQuantity != 0 && (
              <div className="ticket-info">
                <span>Adult</span>
                <span>{adultQuantity} x $30</span>
              </div>
            )}
            {seniorQuantity != 0 && (
              <div className="ticket-info">
                <span>Senior</span>
                <span>{seniorQuantity} x $22</span>
              </div>
            )}
            {disQuantity != 0 && (
              <div className="ticket-info">
                <span>Visitor with Disability</span>
                <span>{disQuantity} x $22</span>
              </div>
            )}
            {studentQuantity != 0 && (
              <div className="ticket-info">
                <span>Student</span>
                <span>{studentQuantity} x $17</span>
              </div>
            )}
            {childQuantity != 0 && (
              <div className="ticket-info">
                <span>Child</span>
                <span>{childQuantity} x $0</span>
              </div>
            )}
            <div className='checkout-info'>
            <span>Total: ${totalPrice}.00</span>
            <button className='checkout-button' type='submit' onClick={handleCheckout} disabled={cannotPurchaseAmt}>Checkout</button>
            </div>
          </div>
        ) : (
          ""
        )}
        </div>
        </div>
      </div>
      ):(<OpenModalButton buttonText='Log in' onButtonClick={closeMenu} modalComponent={<LoginFormModal/>}/>)}
    </>
  );
};

export default TicketsPage;
