import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import './MembershipDetail.css'
import { getUserMembershipThunk, cancelMembershipThunk } from "../../redux/member"
import { useEffect } from "react"
import { useState } from "react"


function MembershipDetails(){
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const member = useSelector((state)=>state.member)
    console.log(member)
    const [timeCheck, setTimeCheck] = useState(true);

    useEffect(()=>{

        // dispatch(thunkAuthenticate())
        dispatch(getUserMembershipThunk())
        
    }, [dispatch])

    useEffect(() => {
        let timeout;
       
        if (!member|| !member["MembershipType"]) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }
    
        return () => clearTimeout(timeout);
    }, [member]);

    if (!member || !member["MembershipType"]  && timeCheck) return <h1>Loading...</h1>;
    else if (!member || !member["MembershipType"] && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

    // const handleDelete = async(id)=>{
    //     await dispatch(cancelMembershipThunk(id))
    //     navigate('/')
    // }

    const handleUpdate = async() =>{
        navigate('/memberships')
    }
    
    return(
        <div className='user-mem-container'>
        <section className='mem-info-block'>

        <h3>Your Membership</h3>
        <ul className='user-mem-info'>
        <li>Type: {member["MembershipType"].name}</li>
        <li>Purchased On:{member.createdAt} </li>
        <li>Next Payment:{member.nextPayment} </li>
        </ul>
        </section>

        <section className='mem-block'>

        {member && (
                            <div className='membership-tile' id={member["MembershipType"].name}>
                            <h3 id='mem-name'>{member["MembershipType"].name}</h3>
                            {member.currCardHolders == 1 ? (
                                    <span id='cardholder'>{member.currCardHolders} cardholder</span>
        
                            ):(
                                <span>{member.currCardHolders} cardholders</span>
                            )}
            
                            <p id='membership-price' className='archivo-black-regular'>${member["MembershipType"].pricePerCycle} / Year </p>
                            {member["MembershipType"].description.split('.').map((point,index)=>{
                                if (index == 0 && member["membershipTypeId"] != 1){
                                    let arr = point.split(' ')
                                    return (
                                        <div key={index}>
                                        <div id='first-line'>
                                        <span>{arr[0]} </span>
                                        <span style={{fontWeight:"bold"}}>{arr[1]}</span>
                                        <span id='first-info'> {arr[2]}</span>
                                        <span> {arr[3]}:</span>
                                        </div>
                                        </div>
                                    )
                                }
                                
                            })}
                            <ul className='member-d-list'>
                            {member["MembershipType"].description.split('.').map((point, index)=>{
                                if((member["membershipTypeId"]==2 || member["membershipTypeId"]==3) && index==0){
                                    return;
                                }
                                return(
        
                                    <li className='bullet-points' key={index}>{point}</li>
                                )
                                
                                })}
                            </ul>
{/*                      
                            <button onClick={()=> handleJoin(membership.id)}className='membership-button archivo-black-regular'>Join</button> */}
                            <div className='user-mem-buttons'>

                                    <button className='user-membership-button archivo-black-regular' onClick={handleUpdate}>Change or Cancel</button>
                                    {/* <button className='user-membership-button archivo-black-regular' onClick={()=> handleDelete(member["membershipTypeId"])} >Delete</button> */}
                            </div>
                        </div>
        )}
        </section>
        </div>
    )

}

export default MembershipDetails