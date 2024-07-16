import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMembershipsThunk } from "../../redux/membership"
import { useNavigate } from "react-router-dom"
import { purchaseMembershipThunk } from "../../redux/session"




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
        <div className='memberships-container'>
            {memberships && Object.values(memberships).map((membership)=>(
                <div key={membership.id} className='membership-tile'>
                    <h3>{membership.name}</h3>
                    {membership.cardholders == 1 ? (
                            <span>{membership.cardholders} cardholder</span>

                    ):(
                        <span>{membership.cardholders} cardholders</span>
                    )}
    
                    <p>${membership.pricePerCycle} / Year </p>
                    <p>{membership.description}</p>
                    <button onClick={()=> handleJoin(membership.id)}className='membership-button'>Join</button>
                </div>
            ) )}
        </div>
        </>

    )

}

export default MembershipsPage