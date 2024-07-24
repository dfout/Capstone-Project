import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAdmissionsThunk } from '../../redux/admission'
import './TicketsPage.css'

function TicketsPage(){
    const dispatch = useDispatch()
    const admissions = useSelector((state)=>state.admissions)

    useEffect(()=>{
        dispatch(getAdmissionsThunk())

    },[dispatch])


    return(
        <div className='tickets-page'>
            <h2>Purchase Tickets</h2>

        <div className='calendar-container'>Container
            <div className='calendar'>
                <div className='days-of-the-week'></div>
            {Object.values(admissions)?.map((admission)=>(
                <div key={admission.id} className='admission-tile'>
                    <span>{admission.day}</span>
                    </div>
            ))}
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

    )
}

export default TicketsPage