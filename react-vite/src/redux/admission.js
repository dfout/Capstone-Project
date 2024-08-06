const GET_ADMISSIONS = 'admissions/getDates'
const GET_USER_ADMISSIONS = 'user/getAdmissions'
const PURCHASE_ADMISSION = 'admissions/purchase'
const GET_ADMISSION = 'admission/get'


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

export const purchaseAdmissionsThunk = (purchase, admission)=> async (dispatch) =>{
    console.log("PURCHASE", purchase)
    console.log("ADMISSION", admission)
    const response = await fetch('/api/admissions/purchase', {method: 'POST', body: purchase})
    if (response.ok){
        const {AdmissionTicketPurchase} = await response.json()
        dispatch(purchaseAdmission(AdmissionTicketPurchase))
    }  else{
        const data = await response.json()
        return data.errors
    }
}

export const getOneAdmissionThunk = (admissionDate) => async(dispatch) =>{
    const response = await fetch('/api/')
}


const initialState = {}

function admissionReducer(state=initialState, action){
switch(action.type){
    case GET_ADMISSIONS:{
        const newState = {}
        action.payload.forEach((admission) => {
            console.log(admission, "ADMISSION")
            const date = new Date(admission.day);
            const year = admission.year
            const month = admission.month //JavaScript months are 0-11
            const day = admission.date
            console.log(date, year, month, "day:",day)

            if (!newState[year]) newState[year] = {};
            if (!newState[year][month]) newState[year][month] = {};
            if(!newState[year][month][day + 1])newState[year][month][day] = admission;
            console.log(newState)
        });
        console.log(newState)
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