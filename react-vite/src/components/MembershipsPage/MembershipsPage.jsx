import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMembershipsThunk } from "../../redux/membership"
import { useNavigate } from "react-router-dom"
import { purchaseMembershipThunk, cancelMembershipThunk } from "../../redux/member"
import './MembershipPage.css'




function MembershipsPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const memberships = useSelector((state)=>state.memberships)
    const user = useSelector((state)=> state.session.user)
    const member = useSelector((state)=>state.member)

    


    useEffect(()=>{
        dispatch(getMembershipsThunk())
    },[dispatch])

    // clicking on any of these membership tiles will take you to the membership purchase page. If you aleady have a membership, this link in the navbar will not exist. only the manage your membership. Under that, then you can change your membership OR
    //Or, this stays up and there is logic included in here

    const handleJoin = async(id)=>{
    
        if (user != null){

             await dispatch(purchaseMembershipThunk(id))
     
            navigate('/user/membership')
        }else{
            navigate('/login')
        }    
        
    }

    const handleCancel = async (id) => {
        await dispatch(cancelMembershipThunk(id));
        navigate('/');
        alert("Membership successfully canceled")
    };

    return(
        <>
            <h2 className="archivo-black-regular discover-mem">Discover More as a Member</h2>
            <div className="mem-intro">
                <p id='intro'>Get closer to the art you love, enjoy exclusive events, and immerse yourself in our vibrant, creative community when you become a member today.</p>
            </div>

            <div className='memberships-container'>
                {memberships && Object.values(memberships).map((membership) => (
                    <div key={membership.id} className='membership-tile' id={membership.name}>
                        <h3 id='mem-name'>{membership.name}</h3>
                        {membership.cardholders === 1 ? (
                            <span id='cardholder'>{membership.cardholders} cardholder</span>
                        ) : (
                            <span>{membership.cardholders} cardholders</span>
                        )}
                        <p id='membership-price' className='archivo-black-regular'>${membership.pricePerCycle} / Year </p>
                        {membership.description.split('.').map((point, index) => {
                            if (index === 0 && membership.id !== 1) {
                                let arr = point.split(' ');
                                return (
                                    <div key={membership.description} id='first-line'>
                                        <span>{arr[0]} </span>
                                        <span style={{ fontWeight: "bold" }}>{arr[1]}</span>
                                        <span id='first-info'> {arr[2]}</span>
                                        <span> {arr[3]}:</span>
                                    </div>
                                );
                            }
                        })}
                        <ul className='member-d-list'>
                            {membership.description.split('.').map((point, index) => {
                                if ((membership.id === 2 || membership.id === 3) && index === 0) {
                                    return null;
                                }
                                return (
                                    <li className='bullet-points' key={index} >{point}</li>
                                );
                            })}
                        </ul>
                        {member && member.id && memberships? (
                            member && member["membershipTypeId"] == membership.id ? (
                                <button 
                                    onClick={() => handleCancel(member.id)} 
                                    className='membership-button archivo-black-regular'>
                                    Cancel Membership
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleJoin(membership.id)} 
                                    className='membership-button archivo-black-regular'>
                                    {membership.id > member["membershipTypeId"] ? 'Upgrade' : 'Downgrade'}
                                </button>
                            )
                        ) : (
                            <button 
                                onClick={() => handleJoin(membership.id)} 
                                className='membership-button archivo-black-regular'>
                                Join
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
        

    )

}

export default MembershipsPage