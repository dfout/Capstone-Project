import { useSelector } from "react-redux"
import './MembershipDetail.css'

function MembershipDetails(){


    const user = useSelector((state)=>state.session.user)
    console.log(user)

    // useEffect(()=>{
    //     dispatchEvent()
    // })
    
    return(
        <div className='user-mem-container'>
        <section className='mem-info-block'>

        <h3>Your Membership</h3>
        <ul className='user-mem-info'>
        <li>Type: {user["MembershipDetails"]["MembershipType"].name}</li>
        <li>Purchased On:{user["MembershipDetails"].createdAt} </li>
        <li>Next Payment:{user["MembershipDetails"].nextPayment} </li>
        </ul>
        </section>

        <section className='mem-block'>

        {user.isMember && (
                            <div className='membership-tile' id={user["MembershipDetails"]["MembershipType"].name}>
                            <h3 id='mem-name'>{user["MembershipDetails"]["MembershipType"].name}</h3>
                            {user["MembershipDetails"].currCardHolders == 1 ? (
                                    <span id='cardholder'>{user["MembershipDetails"].currCardHolders} cardholder</span>
        
                            ):(
                                <span>{user["MembershipDetails"].currCardHolders} cardholders</span>
                            )}
            
                            <p id='membership-price' className='archivo-black-regular'>${user["MembershipDetails"]["MembershipType"].pricePerCycle} / Year </p>
                            {user["MembershipDetails"]["MembershipType"].description.split('.').map((point,index)=>{
                                if (index == 0 && user["MembershipDetails"]["membershipTypeId"] != 1){
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
                            {user["MembershipDetails"]["MembershipType"].description.split('.').map((point, index)=>{
                                if((user["MembershipDetails"]["membershipTypeId"]==2 || user["MembershipDetails"]["membershipTypeId"]==3) && index==0){
                                    return;
                                }
                                return(
        
                                    <li className='bullet-points' key={index} item>{point}</li>
                                )
                                
                                })}
                            </ul>
{/*                      
                            <button onClick={()=> handleJoin(membership.id)}className='membership-button archivo-black-regular'>Join</button> */}
                            <div className='user-mem-buttons'>

                                    <button className='user-membership-button archivo-black-regular' >Update</button>
                                    <button className='user-membership-button archivo-black-regular' >Delete</button>
                            </div>
                        </div>
        )}
        </section>
        </div>
    )

}

export default MembershipDetails