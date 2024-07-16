import { useSelector } from "react-redux"

function MembershipDetails(){


    const membershipDetails = useSelector((state)=>state.session.user)
    console.log(membershipDetails)

    return(
        <>
        <h3>Your Membership</h3>
        </>
    )

}

export default MembershipDetails