const GET_USER_ADMISSIONS = 'user/getAdmissions'
const DELETE_PURCHASE = 'user/delete/purchase'
const UPDATE_USER_ADMISSION = 'user/purchase/update'
const CREATE_TICKET_TYPE  = 'purchase/ticket/type/create'
const UPDATE_TICKET_TYPE = 'purchase/ticket/type/update'


const getUserAdmissions = (admissions)=>({
    type: GET_USER_ADMISSIONS, 
    payload: admissions
})

const updateAdmissionPurchase = (purchase) =>({
    type:UPDATE_USER_ADMISSION, 
    payload: admission
})


const deleteAdmissionPurchase = (id) =>({
    type: DELETE_PURCHASE, 
    payload:id
})

const updateTicketTypePurchase = (purchase) =>({
    type: UPDATE_USER_ADMISSION, 
    payload: purchase
    
})

const createTicketType = (ticketTypePurchase) => ({
    type: CREATE_TICKET_TYPE, 
    payload: ticketTypePurchase,
})


export const deleteTicketTypesPurchasedThunk = (type_id, purchase_id) => async(dispatch)=>{
    const response = await fetch(`/api/users/purchases/${purchase_id}/${type_id}`, {
        method: 'DELETE', 
    })

    if(response.ok){
        console.log("Succesfully deleted ticketTypeInstance")
    }else{
        const data = await response.json()
        return data.error
    }
}


//! Update State please
export const updateTicketTypesPurchasedThunk = (typeObj) => async(dispatch) =>{
    let {type_id, purchase_id} = typeObj;
    const response = await fetch(`/api/users/purchases/${purchase_id}/edit/type/${type_id}`, {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(typeObj)
    })
    if (response.ok){
        // console.log(response.message)
    }else{
        const data = await response.json()
        return data.message
    }
}


//! Update state please

export const updateAdmissionPurchaseThunk = (purchase_id,purchaseObj) => async (dispatch)=>{
    const response = await fetch(`/api/users/purchases/${purchase_id}`, {
        method: 'PATCH', 
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(purchaseObj)
    })
    if (response.ok){
        // Don't actually think I need to do anything here. The user is navigated back to their purchases page which should then update the information by the get request. 
        //* For now, We will print out a success message,
        console.log("Successfully edited admission purchase instance")
    } else{
        const data = await response.json()
        // console.log(data, "DAKLFJALKSDJLASJLDJSKAJJ")
        return data.message
    }
}


export const getUserAdmissionsThunk = () => async (dispatch)=>{
    const response = await fetch('/api/users/admissions')
    if (response.ok){
        const {Admissions} = await response.json()
        dispatch(getUserAdmissions(Admissions))
    }
    else{
        const data = await response.json()
        return data.message
    }
}

export const deleteAdmissionPurchaseThunk = (purchase) => async(dispatch)=>{
    const {id} = purchase
    const response = await fetch(`/api/users/purchases/${id}`, {method: 'DELETE'})
    if (response.ok){
        const {id} = await response.json()
        dispatch(deleteAdmissionPurchase(id))
    }  else{
        const data = await response.json()
        return data.errors
    }
}

// // ! Update State please 
// export const editTicketType = (purchase) => async (dispatch) => {
//     // console.log(purchase,"PURCHASE")
//     const response = await fetch(`/api/users/purchases/${purchase.purchase_id}/edit/type/${purchase.type_id}`,{method:'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(purchase)
//     })

//     if(response.ok){
//         const {TicketTypePurchase} = await response.json()
//         // console.log("here")
//         await dispatch(createTicketType(TicketTypePurchase))
//         return TicketTypePurchase
//     } else{
//         const data = await response.json()
//         return data.errors
//     }

// }

// //! Update state please
// export const createTicketTypeThunk = (purchase)=> async(dispatch) =>{
//     // console.log(purchase,"PURCHASE")
//     const response = await fetch(`/api/admissions/purchases/${purchase.purchase_id}/types/${purchase.type_id}`,{method:'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(purchase)
//     })



//     if(response.ok){
//         const {TicketTypePurchase} = await response.json()
//         // console.log("here")
//         dispatch(createTicketType(TicketTypePurchase))
//         return TicketTypePurchase
//     } else{
//         const data = await response.json()
//         return data.errors
//     }
// }


const initialState = {}

function purchaseReducer(state=initialState, action){
    switch(action.type){
        case GET_USER_ADMISSIONS:{
            const newState = {...state}
            action.payload.forEach((purchase)=>newState[purchase.id]=purchase)
            return newState
        }
        // Need to update the purchase state with the new ticketType. 
        case DELETE_PURCHASE:{
            const newState={...state}
            delete newState[action.payload]
            return newState
        }
        default:
        return state
    }
}

export default purchaseReducer