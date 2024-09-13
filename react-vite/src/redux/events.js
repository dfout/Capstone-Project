const GET_EVENTS = 'get/events'



const getEvents = (events) => ({
    type: GET_EVENTS, 
    payload: events
})


//* Get it to backend
export const getEventsThunk = () => async(dispatch)=>{

    const response = await fetch('/api/events/')

    if (response.ok){
        const {Events} = await response.json()
        dispatch(getEvents(Events))
    }else{
        const data = await response.json()
        return data.message
    }
}




const initialState = {}
//* Get it to Redux
function eventsReducer (state=initialState, action){
    switch(action.type){
        case GET_EVENTS:{
            const newState = {...state}
            action.payload.forEach((event)=> newState[event.id] = event)
            return newState
        }
        default:
            return state
    }
    
}


export default eventsReducer;