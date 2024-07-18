const GET_USER_MEMBERSHIP = '/user/membership'
// const PURCHASE_MEMBERSHIP = '/membership/purchase'
const CANCEL_MEMBERSHIP = '/membership/cancel'
const CHANGE_MEMBERSHIP = '/membership/update'

const getUserMembership =(membership) => ({
    type: GET_USER_MEMBERSHIP,
    payload: membership
})

// const purchaseMembership =(membership) => ({
//     type: PURCHASE_MEMBERSHIP,
//     payload: membership
// })

const cancelMembership =(id) => ({
    type: CANCEL_MEMBERSHIP,
    payload: id
})

const changeMembership = (membership) => ({
    type: CHANGE_MEMBERSHIP, 
    payload: membership
})


export const getUserMembershipThunk = () => async(dispatch) =>{
    const response = await fetch(`/api/users/membership`)
    if(response.ok){
        const {Member} = await response.json()
        dispatch(getUserMembership(Member))
    }else{
        const data = response.json()
        return data.errors
    }
}

export const cancelMembershipThunk = (id)=> async (dispatch) =>{
    const response = await fetch(`/api/memberships/${id}`, {method:"DELETE"})
    if (response.ok){
        dispatch(cancelMembership(id))
        return true
    }else{
        const data = response.json()
        return data.errors
    }
}

export const changeMembershipThunk = (id) => async(dispatch) =>{
    const response = await fetch(`api/memberships/change/${id}`)
    if(response.ok){
        const {Member} = await response.json()
        dispatch(changeMembership(Member))
    }else{
        const data = await response.json()
        return data.errors
    }
}


const initialState = {}
function memberReducer(state=initialState, action){
    switch(action.type){
        case GET_USER_MEMBERSHIP:{
            const newState = {...action.payload}
            return newState

        }
        case CANCEL_MEMBERSHIP:{
            const newState = {...state}
            delete newState[action.payload]
            return newState

        }
        case CHANGE_MEMBERSHIP:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState

        }
        default:
            return state
    }

}

export default memberReducer