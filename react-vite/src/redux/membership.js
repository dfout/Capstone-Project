const GET_MEMBERSHIPS = '/memberships/getAll'
const GET_USER_MEMBERSHIP = '/user/membership'
const PURCHASE_MEMBERSHIP = '/membership/purchase'
const CANCEL_MEMBERSHIP = '/membership/cancel'
const CHANGE_MEMBERSHIP = '/membership/update'


const getMemberships= (memberships) =>({
    type:GET_MEMBERSHIPS, 
    payload: memberships
})

const getUserMembership =(membership) => ({
    type: GET_USER_MEMBERSHIP,
    payload: membership
})

const purchaseMembership =(membership) => ({
    type: PURCHASE_MEMBERSHIP,
    payload: membership
})

const cancelMembership =(id) => ({
    type: CANCEL_MEMBERSHIP,
    payload: id
})

const changeMembership = (membership) => ({
    type: CHANGE_MEMBERSHIP, 
    payload: membership
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

export const purchaseMembershipThunk = (id) => async (dispatch)=>{
    const response = await fetch(`/api/memberships/purchase/${id}`, {method: "POST"})

    if(response.ok){
        const {Member} = await response.json()
        dispatch(purchaseMembership(Member))
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
function membershipReducer(state=initialState, action){
    switch(action.type){
        case GET_MEMBERSHIPS:{
            const newState = {...state}
            action.payload.forEach((membership)=> newState[membership.id]=membership)
            return newState

        }
        case GET_USER_MEMBERSHIP:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState

        }
        case PURCHASE_MEMBERSHIP:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
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

export default membershipReducer