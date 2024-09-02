import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { deleteAdmissionPurchaseThunk } from "../../redux/purchase"
import { getUserAdmissionsThunk } from "../../redux/purchase"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import EditAdmissionPurchase from "../EditAdmissionPurchase"
import { useNavigate } from "react-router-dom"

import './PurchasesPage.css'




/// Logged in users can see all their admissions purchases
function PurchasesPage(){
    const dispatch = useDispatch()

    const purchases = useSelector((state)=>state.purchases)
    const [showUpcoming, setShowUpComing] = useState(false)
    const [upcomings, setUpComings] = useState([])
    const [timeCheck, setTimeCheck] = useState(true);

    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getUserAdmissionsThunk())
    },[dispatch])

    useEffect(() => {
        let timeout;
       
        if (!purchases || !Object.values(purchases).length || !Object.values(purchases)[0]["TicketTypesPurchased"]) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }else{
            console.log(Object.values(purchases)[0])
        }
    
        return () => clearTimeout(timeout);
    }, [purchases]);
    
    const comingSoon = () =>{
        alert("Under construction, Thank you for your patience")
      }

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
    
    const handleDeletePurchase = async(purchase) =>{
        const response = await dispatch(deleteAdmissionPurchaseThunk(purchase))
    }

    const upComingAdmissions = (purchases)=>{

        const admissionDate = new Date(purchase.Admission);
        const currentDate = new Date();
        const diffInMs = admissionDate.getTime() - currentDate.getTime();
        const daysDifference = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if(showUpcoming == false){
            console.log(Object.values(purchases))

            let upcoming = []
            for (let purchase of Object.values(admissions)){
                console.log(purchase)
    
                const admissionDate = new Date(purchase.Admission);
                const currentDate = new Date();
                if (admissionDate > currentDate){
                    upcoming.push(purchase)
                }
    
            }
            setShowUpComing(true)
            setUpComings(upcoming)
            console.log(upcoming)
            return upcoming
        }else{
            setShowUpComing(false)
        }

    }

    const pastAdmissions = () =>{
        let past = []
        for ( let purchase of Object.values(purchases)){
            const admissionDate = new Date(purchase.Admission);
            const currentDate = new Date();
            if (admissionDate < currentDate){
                past.push(purchase)
            }
        }
        return past
    }

    const editableAdmissions = () =>{


    }

    const handleUpdate = (id) =>{
        
        navigate(`/user/purchases/${id}/edit`)
    }

    if (!purchases && timeCheck) return <h1>Loading...</h1>;
    else if (!purchases && !timeCheck) return <h1>Sorry, please refresh the page</h1>;
    return(
        <>
        <div className='refund-edit-container'>
        <div className='box'>
            <p id='edit'>Change Admission Details</p>
            <p>Updating ticket quanitity or type is available up to 24 hours in advance of admission date. Price adjustments will be made.</p>
            </div>

            <div className='box'>
            <p id='edit'>Cancel Admission Purchase</p>
            <p className='limited'>Cancelling any admissions purchases 24 hours prior to the admission date will result in a 100% refund.</p>
            </div>


        </div>
        <div className='purchases-cont'>

        <h2>Your Admission Purchases</h2>
        <div className='purchases'>
        {/* <h3 onClick={()=>upComingAdmissions(admissions)}><Link>Upcoming Admissions</Link></h3> */}
        {/* {showUpcoming && upcomings && Object.values(upcomings)?.map((purchase)=> <div key={purchase.id} className='list-purchases'>
                <span> Admission: {new Date(purchase["Admission"]).toDateString()}</span>
                <span> Cost: ${purchase.totalPrice}.00 </span>
                <span> Ticket Quantity: {purchase.ticketQuantity}</span>
                <span> Purchased: {new Date(purchase.purchasedOn).toDateString()}</span>
          
                {daysDifference >= 1 && ( // Show buttons only if at least 24 hours in advance
                <>
                    <button><Link to='/tickets' purchase={purchase}>Update Purchase</Link></button>
                    <button onClick={()=>handleDeletePurchase(purchase)}>Cancel Purchase</button>
                </>
                )}
            </div>) } */}
        {!Object.values(purchases).length && (
            <h2>No purchases</h2>

        )}
        {/* <div className='column-labels'>
            <span>Admission Date</span>
            <span>Cost</span>
            <span>Ticket Quantity</span>
            <span>Purchased On</span>
            <span className='placeholder'>Here</span>
            <span className='placeholder'>Here</span>
        </div> */}

        {Object.values(purchases)?.reverse().map((purchase)=>{
            const year = purchase.Admission.year
            const day_of_week = purchase.Admission.day_of_week
            const month = purchase.Admission.month
            const monthName = monthNames[month - 1]
            const date = purchase.Admission.date
            const admissionDate = new Date(purchase.Admission.year, month - 1, purchase.Admission.date);
            
            console.log("ADMISSION DAY", admissionDate)
            const currentDate = new Date();
            const diffInMs = admissionDate.getTime() - currentDate.getTime();
            const daysDifference = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            console.log("DAYS DIF",daysDifference)
            
            if (daysDifference >=1){

                return(
                    
                <div key={purchase.id} className='list-purchases space-between'>
                    {/* <span> Admission: {new Date(purchase["Admission"]).toDateString()}</span>
                    <span> Cost: ${purchase.totalPrice}.00 </span>
                    <span> Ticket Quantity: {purchase.ticketQuantity}</span>
                    <span> Purchased: {new Date(purchase.purchasedOn).toDateString()}</span> */}
              
                    {daysDifference >= 1 && ( // Show buttons only if at least 24 hours in advance
                    <>
                    <span> Admission: {day_of_week} {monthName} {date}, {year}</span>
                    <span> Cost: ${purchase.totalPrice}.00 </span>
                    <span> Ticket Quantity: {purchase.ticketQuantity}</span>
                    <span> Purchased: {new Date(purchase.purchasedOn).toDateString()}</span>
                        {/* <button className='membership-button' id='manage' onClick={()=> handleUpdate(purchase.id)}>Update Purchase</button> */}
                        <button className='membership-button' id='manage' onClick={()=>handleUpdate(purchase.id)}>Update Purchase</button>
                        <button className='membership-button' id='manage'  onClick={()=>handleDeletePurchase(purchase)}>Cancel Purchase</button>
                    </>
                    )}
                </div>
    
                )
            }else{
                return(
                    <div key={purchase.id} className='list-purchases'>
               
                    <span> Admission: {day_of_week} {monthName} {date}, {year}</span>
                    <span> Cost: ${purchase.totalPrice}.00 </span>
                    <span> Ticket Quantity: {purchase.ticketQuantity}</span>
                    <span> Purchased: {new Date(purchase.purchasedOn).toDateString()}</span>
                </div>
                )
            }
            
        })}
        </div>
        </div>
        
        </>
    )


}

export default PurchasesPage