const GET_MEMBERSHIPS = '/memberships/getAll'



const getMemberships= (memberships) =>({
    type:GET_MEMBERSHIPS, 
    payload: memberships
})





export const getMembershipsThunk = () => async (dispatch) =>{
    const response = await fetch('/api/memberships/')
    if(response.ok){
        const {Memberships} = await response.json()
        dispatch(getMemberships(Memberships))
    }else{
        const data = await response.json()
        return data.errors
    }
}




// export const purchaseMembershipThunk = (id) => async (dispatch)=>{
//     const response = await fetch(`/api/memberships/purchase/${id}`, {method: "POST"})

//     if(response.ok){
//         const {Member} = await response.json()
//         dispatch(purchaseMembership(Member))
//         // return {Member}
//     }else{
//         const data = response.json()
//         return data.errors
//     }
// }



const initialState = {}
function membershipReducer(state=initialState, action){
    switch(action.type){
        case GET_MEMBERSHIPS:{
            const newState = {...state}
            action.payload.forEach((membership)=> newState[membership.id]=membership)
            return newState

        }
        default:
            return state
    }

}

export default membershipReducer