import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { deleteAdmissionPurchaseThunk, getUserAdmissionsThunk } from "../../redux/admission"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

import './PurchasesPage.css'




/// Logged in users can see all their admissions purchases
function PurchasesPage(){
    const dispatch = useDispatch()

    const admissions = useSelector((state)=>state.admissions)
    const [showUpcoming, setShowUpComing] = useState(false)
    const [upcomings, setUpComings] = useState([])

    useEffect(()=>{
        dispatch(getUserAdmissionsThunk())
    },[dispatch])


    const handleDeletePurchase = async(purchase) =>{
        const response = await dispatch(deleteAdmissionPurchaseThunk(purchase))
    }
    
    const upComingAdmissions = (admissions)=>{
        if(showUpcoming == false){

            let upcoming = []
            for (purchase of admissions){
    
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
        for (purchase of admissions){
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
    return(
        <>
        <h2>Your Admission Purchases</h2>
        <div className='purchases'>
        <h3 onClick={upComingAdmissions}><Link>Upcoming Admissions</Link></h3>
        {showUpcoming && upcomings && Object.values(upcomings)?.map((purchase)=> <div key={purchase.id} className='list-purchases'>
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
            </div>) }

        {Object.values(admissions)?.reverse().map((purchase)=>{

            const admissionDate = new Date(purchase.Admission);
            const currentDate = new Date();
            const diffInMs = admissionDate.getTime() - currentDate.getTime();
            const daysDifference = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            return(

            <div key={purchase.id} className='list-purchases'>
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
            </div>

            )
        })}
        </div>
        <div className='refund-edit-container'>
            <h3>Cancellation</h3>
            <p>Cancelling any admissions purchases 24 hours prior to the admission date will result in a 100% refund.</p>
            <h3>Update</h3>
            <p>Updating ticket quanitity or type is available up to 24 hours in advance of admission date. Price adjustments will be made.</p>
        </div>
        </>
    )


}

export default PurchasesPage