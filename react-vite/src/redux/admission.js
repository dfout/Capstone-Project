const GET_ADMISSIONS = 'admissions/getDates'
const GET_USER_ADMISSIONS = 'user/getAdmissions'
const PURCHASE_ADMISSION = 'admissions/purchase'


const purchaseAdmission = (admissionPurchase) =>({
    type: PURCHASE_ADMISSION, 
    payload: admissionPurchase
})

const getAdmissions =(admissions)=>({
    type:GET_ADMISSIONS, 
    payload: admissions
})

const getUserAdmissions = (admissions)=>({
    type: GET_USER_ADMISSIONS, 
    payload: admissions
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
        const data = await response.json()
        return data.errors
    }
}

export const purchaseAdmissionsThunk = (purchase)=> async (dispatch) =>{
    const response = await fetch('/api/admissions/purchase', {method: 'POST', body: purchase})
    if (response.ok){
        const {AdmissionTicketPurchase} = await response.json()
        dispatch(purchaseAdmission(AdmissionTicketPurchase))
    }  else{
        const data = await response.json()
        return data.errors
    }
}


const initialState = {}

function admissionReducer(state=initialState, action){
switch(action.type){
    case GET_ADMISSIONS:{
        const newState = {...state}
        action.payload.forEach((day)=> newState[day.id]= day)
        return newState
    }
    case GET_USER_ADMISSIONS:{
        const newState = {}
        action.payload.forEach((purchase)=>newState[purchase.id]=purchase)
        return newState

    }
    case PURCHASE_ADMISSION:{
        const newState = {}
        newState[action.payload.id] = action.payload
        return newState
    }
    default:
        return state
}
}

export default admissionReducer