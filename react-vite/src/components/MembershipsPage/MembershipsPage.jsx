import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMembershipsThunk } from "../../redux/membership"
import { useNavigate } from "react-router-dom"
import { purchaseMembershipThunk } from "../../redux/session"
import './MembershipPage.css'




function MembershipsPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const memberships = useSelector((state)=>state.memberships)


    useEffect(()=>{
        dispatch(getMembershipsThunk())
    },[dispatch])

    // clicking on any of these membership tiles will take you to the membership purchase page. If you aleady have a membership, this link in the navbar will not exist. only the manage your membership. Under that, then you can change your membership OR
    //Or, this stays up and there is logic included in here

    const handleJoin = async(id)=>{
        
       const response =  await dispatch(purchaseMembershipThunk(id))

       navigate('/user/membership')
        
    }

    return(
        <>
        <h2 className="archivo-black-regular discover-mem">Discover More as a Member</h2>
        <div className="mem-intro">        <p id='intro'>Get closer to the art you love, enjoy exclusive events, and immerse yourself in our vibrant, creative community when you become a member today.</p></div>

        <div className='memberships-container'>

            {memberships && Object.values(memberships).map((membership)=>(
                <div key={membership.id} className='membership-tile'>
                    <h3 id='mem-name'>{membership.name}</h3>
                    {membership.cardholders == 1 ? (
                            <span id='cardholder'>{membership.cardholders} cardholder</span>

                    ):(
                        <span>{membership.cardholders} cardholders</span>
                    )}
    
                    <p id='membership-price' className='archivo-black-regular'>${membership.pricePerCycle} / Year </p>
                    {membership.description.split('.').map((point,index)=>{
                        if (index == 0 && membership.id != 1){
                            let arr = point.split(' ')
                            return (
                                <div id='first-line'>
                                <span>{arr[0]} </span>
                                <span style={{fontWeight:"bold"}}>{arr[1]}</span>
                                <span id='first-info'> {arr[2]}</span>
                                <span> {arr[3]}:</span>
                                </div>
                            )
                        }
                        
                    })}
                    <ul className='member-d-list'>
                    {membership.description.split('.').map((point, index)=>{
                        if((membership.id==2 || membership.id==2) && index==0){
                            return;
                        }
                        return(

                            <li className='bullet-points' key={index} item>{point}</li>
                        )
                        
                        })}
                    </ul>
             
                    <button onClick={()=> handleJoin(membership.id)}className='membership-button archivo-black-regular'>Join</button>
                </div>
            ) )}
        </div>
        </>

    )

}

export default MembershipsPage