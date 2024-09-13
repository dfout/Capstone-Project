const GET_ADMISSIONS = 'admissions/getDates'
const GET_USER_ADMISSIONS = 'user/getAdmissions'
const PURCHASE_ADMISSION = 'admissions/purchase'
const GET_ADMISSION = 'admission/get'
const DELETE_PURCHASE = 'admission/delete'
const CREATE_ADMISSION = 'admission/create'
const CREATE_TICKET_TYPE  = 'purchase/ticket/type'


const purchaseAdmission = (admissionPurchase) =>({
    type: PURCHASE_ADMISSION, 
    payload: admissionPurchase
})

const getAdmissions =(admissions)=>({
    type:GET_ADMISSIONS, 
    payload: admissions
})

const getOneAdmission = (admission) =>({
    type:GET_ADMISSION, 
    payload: admission
})

const getUserAdmissions = (admissions)=>({
    type: GET_USER_ADMISSIONS, 
    payload: admissions
})

const deleteAdmissionPurchase = (id) =>({
    type: DELETE_PURCHASE, 
    payload:id
})

const createAdmission = (admission) =>({
    type:CREATE_ADMISSION,
    payload:admission
})

const createTicketType = (ticketType) =>({
    type:CREATE_TICKET_TYPE,
    payload: ticketType
})

export const getAdmissionsThunk = ()=> async (dispatch)=>{
    const response = await fetch('/api/admissions/')
    if (response.ok){
        const {Admissions} = await response.json()
        dispatch(getAdmissions(Admissions))
    }
    else{
        const data = response.json()
        return data.errors
    }
}

export const getUserAdmissionsThunk = () => async (dispatch)=>{
    const response = await fetch('/api/users/admissions')
    if (response.ok){
        const {Admissions} = await response.json()
        dispatch(getUserAdmissions(Admissions))
    }
    else{
        // const data = await response.json()
        // console.log(data, "DAKLFJALKSDJLASJLDJSKAJJ")
        return data.message
    }
}

export const purchaseAdmissionsThunk = (purchase, admission)=> async (dispatch) =>{
    // console.log("PURCHASE", purchase)
    // console.log("ADMISSION", admission)
    if(purchase.member_discount == undefined || purchase.member_discount == null){
        purchase["member_discount"] = 0
    }
    const body = JSON.stringify({...purchase, admission})

    const response = await fetch('/api/admissions/purchase', {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body

    })
    if (response.ok){
        const {AdmissionTicketPurchase} = await response.json()
        dispatch(purchaseAdmission(AdmissionTicketPurchase))
        return AdmissionTicketPurchase
    }  else{
        const data = await response.json()
        return data.errors
    }
}

export const getOneAdmissionThunk = (admissionDate) => async(dispatch) =>{
    const response = await fetch('/api/')
}



export const createAdmissionThunk = (admission) => async(dispatch)=>{
    const response = await fetch('/api/admissions/create',{
        method:'POST', 
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(admission)
    })
    if (response.ok){
        const {Admission} = await response.json()
        return Admission
    }else{
        const data = await response.json()
        return data.errors
    }
}

//! Update state please
export const createTicketTypePurchase = (purchase)=> async(dispatch) =>{
    // console.log(purchase,"PURCHASE")
    const response = await fetch(`/api/admissions/purchases/${purchase.purchase_id}/types/${purchase.type_id}`,{method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(purchase)
    })



    if(response.ok){
        const {TicketTypePurchase} = await response.json()
        // console.log("here")
        dispatch(createTicketType(TicketTypePurchase))
        return TicketTypePurchase
    } else{
        const data = await response.json()
        return data.errors
    }
}

// ! Update State please 
export const createTicketTypePurchaseOnEdit = (purchase) => async (dispatch) => {
    // console.log(purchase,"PURCHASE")
    const response = await fetch(`/api/users/purchases/${purchase.purchase_id}/edit/type/${purchase.type_id}`,{method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(purchase)
    })

    if(response.ok){
        const {TicketTypePurchase} = await response.json()
        // console.log("here")
        return TicketTypePurchase
    } else{
        const data = await response.json()
        return data.errors
    }

}

const initialState = {}

function admissionReducer(state=initialState, action){
switch(action.type){
    case GET_ADMISSIONS:{
        const newState = {...state}
        action.payload.forEach((admission) => {
            // console.log(admission, "ADMISSION")
            const date = new Date(admission.day);
            const year = admission.year
            const month = admission.month //JavaScript months are 0-11
            const day = admission.date
            // console.log(date, year, month, "day:",day)

            if (!newState[year]) newState[year] = {};
            if (!newState[year][month]) newState[year][month] = {};
            if(!newState[year][month][day + 1])newState[year][month][day] = admission;
            // console.log(newState)
        });
        // console.log(newState)
        return newState
    }
    // case GET_USER_ADMISSIONS:{
    //     const newState = {}
    //     action.payload.forEach((purchase)=>newState[purchase.id]=purchase)
    //     return newState

    // }
    case PURCHASE_ADMISSION:{
        const newState = {}
        newState[action.payload.purchase] = action.payload
        return newState
    }


    default:
        return state
}
}

export default admissionReducer