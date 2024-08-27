

import { useState, useEffect } from "react";
// import "./TicketsPage.css";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import OpenModalButton from "../OpenModalButton";
import { useNavigate, useParams } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import {useModal} from '../../context/Modal'
import { createAdmissionThunk, createTicketTypePurchase, getAdmissionsThunk, getUserAdmissionsThunk, purchaseAdmissionsThunk } from "../../redux/admission";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const EditAdmissionPurchase = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const closeMenu = useModal()

    let {id} = useParams()

    const purchase = useSelector((state)=>state.purchases[id])
    const admissions = useSelector((state)=>state.admissions)
    const sessionUser = useSelector((state)=> state.session.user)




    const [timeCheck, setTimeCheck] = useState(true);




  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [adultQuantity, setAdultQuantity] = useState(0);
  const [seniorQuantity, setSeniorQuantity] = useState(0);
  const [disQuantity, setDisQuantity] = useState(0);
  const [studentQuantity, setStudentQuantity] = useState(0);
  const [childQuantity, setChildQuantity] = useState(0);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [isSoldOut, setIsSoldOut] = useState(false)
  const [maxAdmin, setMaxAdmin] = useState(500)
  const [isTooMany, setIsTooMany] = useState(false)
  const [tooMany, setTooMany] = useState(0)
  const [admissionId, setAdmissionId] = useState(0)
  const [freebie, setFreebie] = useState(0)
  const [guestPrice, setGuestPrice] = useState(0)
  const [changed, setChanged] = useState([])
  const [editError, setEditError] = useState({})

   useEffect(()=>{
        dispatch(getAdmissionsThunk())
        dispatch(getUserAdmissionsThunk())
    }, [dispatch])


    useEffect(() => {
        let timeout;

        if (!purchase || !purchase["AdmissionDetails"] || !purchase["TicketTypesPurchased"] || !admissions) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            // dispatch(getAdmissionsThunk())
            // dispatch(getUserAdmissionsThunk())
            
        }else if (purchase && purchase["AdmissionDetails"] && purchase["TicketTypesPurchased"] && admissions){
            const admission = purchase['AdmissionDetails']
            const ticketTypes = purchase['TicketTypesPurchased']
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            const year = admission.year
            setCurrentYear(year)
            const month = admission.month
            setCurrentMonth(month - 1)
            const date  = admission.date
            const original = new Date(year, month - 1, date)
            const formattedDate = original.toLocaleDateString(undefined, options);
            setSelectedDate(formattedDate)
          
 



        for (let ticketTypePurchased of ticketTypes){
            console.log(ticketTypePurchased)
            if(ticketTypePurchased.typeId == 1){
                console.log(ticketTypePurchased.quantity, "QUAN")
                setAdultQuantity(ticketTypePurchased.quantity)
                console.log(adultQuantity)
            }
            if(ticketTypePurchased.typeId == 2){
                setSeniorQuantity(ticketTypePurchased.quantity)
            }
            if(ticketTypePurchased.typeId == 3){
                setDisQuantity(ticketTypePurchased.quantity)
            }
            if(ticketTypePurchased.typeId == 4){
                setStudentQuantity(ticketTypePurchased.quantity)
            }
            if(ticketTypePurchased.typeId == 5){
                setChildQuantity(ticketTypePurchased.quantity)
            }
            
        }
       
        setMaxAdmin(admission.max_admissions)
        setModalVisible(true)
        setTotalPrice(purchase.totalPrice)
        setTotalQuantity(purchase.ticket_quantity)
        setCheckoutModal(true)

        }

        return () => clearTimeout(timeout);
    }, [purchase, admissions, dispatch]);


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
                 ${isSelectedDay ? "bg-green-500 text-white" : ""} ${day == selectedDate && "black-background white-text" }`}
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
    useEffect(() => {
    generateCalendar(currentYear, currentMonth);
    }, [currentYear, currentMonth, selectedDate]);




  // Attempt at a more efficient solution
//   useEffect(()=>{
//     console.log(changed.includes(1))
//     if(!changed.includes(1)){

//         addToChanged(1)
//         console.log(changed, "CHANGED")
//     }

//   },[adultQuantity])
  
// useEffect(()=>{
//     console.log(changed.includes(2))
//     if(!changed.includes(2)){

//         addToChanged(2)
//         console.log(changed, "CHANGED")
//     }

// },[seniorQuantity])
 

  useEffect(()=>{
    if(totalQuantity > maxAdmin){
      setIsTooMany(true)
      setTooMany(maxAdmin)
      
    }else{
      setIsTooMany(false)
    }

    if(totalQuantity==0)setCheckoutModal(false)
  },[totalQuantity, maxAdmin])

// Was member discount attempt: 
// if (!member || !admissions && timeCheck) return <h1>Loading...</h1>;
// else if (!member || !admissions && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

// if(member?.MembershipType?.id){
//   const id = member.MembershipType.id
//   if (id == 1){
//     setFreebie(1)
//     setGuestPrice(5)
//   }else if (id== 2){
//     setFreebie(2)
//     setGuestPrice(5)
//   }else if (id == 3){
//     setFreebie(5)
//     setGuestPrice(5)
//   }
// }

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

  const cannotPurchaseAmt = isTooMany || isSoldOut || !selectedDate

  const handleDayClick = async (day) => {
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
      setAdmissionId(admissions[year][month][date].id)
      if (max==0){
        setIsSoldOut(true)
      }else{
        setMaxAdmin(max)
        setIsSoldOut(false)
      }
    }else if(!admissions[year] || !admissions[year][month] || !admissions[year][month][day] ){
      let day = selected
      setMaxAdmin(500)
      console.log("DAYYYYYY", selected.getDate())
      const options = {'weekday':'long'}
      const admission = {
        day:selected,
        date:day.getDate(),
        month:day.getMonth() + 1,
        year:day.getFullYear(),
        max_admissions: maxAdmin,
        day_of_week: day.toLocaleDateString('en-US', options),
      }
      console.log("BEFORE DISPATCHd")
      const response = await dispatch(createAdmissionThunk(admission))
      console.log(response, "GHERERERER")

      setAdmissionId(response.id)
      
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


  //! CHECKOUT

  // For editing: The changes we need to worry about are:
  // - Date changes
  // - ticket quantity changes 

  // we start out with original information. We need to only track the information that differs from the original data. 
  // so we should store the original data. I do not want to make unneccessary calls to the backend if a quantity did not change and we update it to the same value. 


  // ? How to do that:
    // Only keep track of the things that have changed. 
    // Need a way to flag any changes
  // ? For updating the purchase
  // ? We need to update the purchase instance itself, 
  // ? Then we need to update or create any new ticketTypePurchased instances. 
  //! for this, we need to grab out all the ticket types purchased for this purchase 
  // then, iterate through them, or organize them by typeId in objects
  // so lets 
  const handleCheckout = async() =>{
    // need to query for the admission information
    // if (!sessionUser){
    //   navigate('/login')
    // }

  const parsedDate = new Date(selectedDate)

  const formattedDate = parsedDate.toUTCString()


  // formatted date is the correct format. 
      const newPurchase = {
        admission_id: admissionId,
        user_id: sessionUser.id,
        total_price: totalPrice, 
        ticket_quantity: totalQuantity,
      
      }
      // "Friday, August 23, 2024"
      // instead of 
      
      console.log("Date that gets passed in", formattedDate)
    //   const response = await dispatch(purchaseAdmissionsThunk(newPurchase, formattedDate))
    
      const respone = await dispatch(up)
      let id = response.id

      

    
      if(adultQuantity){
        let adult_ticket = {
          purchase_id: id, 
          type_id: 1, 
          quantity: adultQuantity,
          
        }
        const response = await dispatch(createTicketTypePurchase(adult_ticket))
      }

      if(seniorQuantity){
        let senior_ticket = {
          purchase_id: id, 
          type_id: 2, 
          quantity: seniorQuantity,
          
        }
        const response = await dispatch(createTicketTypePurchase(senior_ticket))
      }
      if(disQuantity){
        let disability_ticket = {
          purchase_id: id, 
          type_id: 3, 
          quantity: disQuantity,
        }
        const response = await dispatch(createTicketTypePurchase(disability_ticket))
      }
      if(studentQuantity){
        let student_ticket = {
          purchase_id:id,
          type_id:4,
          quantity: studentQuantity
        }
        const response = await dispatch(createTicketTypePurchase(student_ticket))
      }

      if(childQuantity){
       let child_ticket ={
          purchase_id:id,
          type_id:5,
          quantity:childQuantity
        }
        const response = await dispatch(createTicketTypePurchase(child_ticket))
      }

      // need to pass in the quantity of each ticket type


      //Create AdmissionTicketTypesPurchased instances
       
      

      //dispatch to the backend 
      setAdultQuantity(0)
     navigate('/user/purchases')
  }

  // for member discounts
  // const ticketHierarchy = [adultQuantity,]

  if (!purchase || !purchase["AdmissionDetails"] || !purchase["TicketTypesPurchased"] || !admissions && timeCheck) return <h1>Loading...</h1>;
  else if (!purchase || !purchase["AdmissionDetails"] || !purchase["TicketTypesPurchased"] || !admissions && !timeCheck) return <h1>Sorry, please refresh the page</h1>;  

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center padding h-screen">
        <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
              <button className="text-white membership-button" onClick={handlePrevMonth}>
                Previous
              </button>
              <h2 className="text-white">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button className="text-white membership-button" onClick={handleNextMonth}>
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
                  <p className="text-2xl font-bold padding-bottom">Selected Date:</p>
                </div>
                <div className="text-xl font-semibold">{selectedDate}</div>
                <div className='date-info'>
                <span id='amt'>{maxAdmin} available tickets</span>
                <span>

                <span id='amt'>Need to book for more than 20 people?</span>
                <Link id='amt-two'>Contact us Here</Link>
                </span>
                </div>
                {isTooMany && tooMany && (
          <div id='only'>Sorry, looks like there are only {tooMany} tickets left for this day</div>
        )}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      {sessionUser && selectedDate && !isSoldOut && (

      <div>
        <p className='padding-left-3rem font-2rem'>Select Tickets</p>
        <p className='padding-left-3rem'>
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
                className="quantity-button minus-button"
                onClick={() => handleAdultClick("minus")}
                disabled={!adultQuantity}
              >
                <FaMinus />
              </button>
              <span>{adultQuantity}</span>
              <button
                className="quantity-button membership-button"
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
                className="quantity-button minus-button"
                onClick={() => handleSeniorClick("minus")}
                disabled={!seniorQuantity}
              >
                <FaMinus />
              </button>
              <span>{seniorQuantity}</span>
              <button
                className="quantity-button membership-button"
                onClick={() => handleSeniorClick("plus")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="ticket-row">
            <div className="ticket-left">
              <span className="ticket-type" >Visitor with disability</span>
              <span>
                Free admission for a care partner accompanying a visitor with a
                disability
              </span>
            </div>
            <div className="ticket-right">
              <span>$22</span>
              <button
                className="quantity-button minus-button"
                onClick={() => handleDisClick("minus")}
                disabled={!disQuantity}
              >
                <FaMinus />
              </button>
              <span>{disQuantity}</span>
              <button
                className="quantity-button membership-button"
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
                className="quantity-button minus-button"
                onClick={() => handleStudentClick("minus")}
                disabled={!studentQuantity}
              >
                <FaMinus />
              </button>
              <span>{studentQuantity}</span>
              <button
                className="quantity-button membership-button"
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
                className="quantity-button minus-button"
                onClick={() => handleChildClick("minus")}
                disabled={!childQuantity}
              >
                <FaMinus />
              </button>
              <span>{childQuantity}</span>
              <button
                className="quantity-button membership-button"
                onClick={() => handleChildClick("plus")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        {editError.error &&  (
            <h4 style={{"color":"red"}}>{editError.error}</h4>
        )}
      {checkoutModal && (

        <div className='modal-content checkout'>
        {checkoutModal &&
        (adultQuantity ||
          studentQuantity ||
          seniorQuantity ||
          disQuantity ||
          childQuantity) ? (
          <div className="ticket-checkout-modal"><p className="text-2xl font-bold padding-bottom font-2rem">Cart</p><hr></hr>
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
            <span id='total'>Total: ${totalPrice}.00</span>
            {/* {member.MembershipType.id && (
              <span>Member Discount: </span>
            )} */}
            <div className='flex center'>
            <button className='membership-button' type='submit' onClick={handleCheckout} disabled={cannotPurchaseAmt}>Checkout</button>
            </div>
            </div>
          </div>
        ) : (
          ""
        )}
        </div>
        )}
        </div>
      </div>
      )}
      {!sessionUser && (<OpenModalButton buttonText='Log in' onButtonClick={closeMenu} modalComponent={<LoginFormModal/>}/>)}
      {!selectedDate && sessionUser && (<h2>Select a date</h2>)}

    </>
  );
};

export default EditAdmissionPurchase
