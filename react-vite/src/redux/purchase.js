const GET_USER_ADMISSIONS = 'user/getAdmissions'


const getUserAdmissions = (admissions)=>({
    type: GET_USER_ADMISSIONS, 
    payload: admissions
})


export const getUserAdmissionsThunk = () => async (dispatch)=>{
    const response = await fetch('/api/users/admissions')
    if (response.ok){
        const {Admissions} = await response.json()
        dispatch(getUserAdmissions(Admissions))
    }
    else{
        const data = await response.json()
        console.log(data, "DAKLFJALKSDJLASJLDJSKAJJ")
        return data.message
    }
}

const initialState = {}

function purchaseReducer(state=initialState, action){
    switch(action.type){
        case GET_USER_ADMISSIONS:{
            const newState = {...state}
            action.payload.forEach((purchase)=>newState[purchase.id]=purchase)
            return newState

        }
        default:;
        return state
    }
}

export default purchaseReducer