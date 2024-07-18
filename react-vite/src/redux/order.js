const GET_ORDERS = '/orders/getAll'




const getOrders = (orders)=>{
    return{
        type:GET_ORDERS, 
        payload:orders
    }
}


export const getOrdersThunk = () => async(dispatch)=>{
    const response = await fetch('/api/users/orders')
    if (response.ok){
        const {Orders} = await response.json()
        dispatch(getOrders(Orders))
    }else{
        const data = await response.json()
        return data.errors
    }
}


const initialState = {}

function ordersReducer (state=initialState, action){
    switch(action.type){
        case GET_ORDERS:{
            const newState= {...state}
            action.payload.forEach((order)=> newState[order.id]= order)
            return newState
        }
        default:
            return state

    }
}

export default ordersReducer