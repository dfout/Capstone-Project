const GET_CART = 'cart/get'
const ADD_TO_CART = 'cart/add'
const REMOVE_FROM_CART = 'cart/remove'
const UPDATE_CART_ITEM = 'cart/update'


const getCart = (cart) =>({
    type: GET_CART, 
    payload:cart
})

const addToCart = (item) =>({
    type: ADD_TO_CART, 
    payload: item
})


const removeFromCart = (id) =>({
    type:REMOVE_FROM_CART, 
    payload: id
})

const updateCartItem = (item) => ({
    type: UPDATE_CART_ITEM, 
    payload: item
})


export const getCartThunk = ()=> async (dispatch)=>{
    const response = await fetch('/api/store/cart/')
    if (response.ok){
        const {CartItems} = await response.json()
        dispatch(getCart(CartItems))
        
    }else{
        const data = await response.json()
        return data.errors
    }

}

export const addToCartThunk = (id) => async (dispatch)=>{
const response = await fetch(`/api/store/items/${id}/cart`,{ method: "POST"})
if (response.ok){
    const {CartItem} = await response.json()
    dispatch(addToCart(CartItem))
}else{
    const data = response.json()
    return data.errors
}
}

export const removeFromCartThunk = (id) => async (dispatch)=>{
const response = await fetch(`/api/store_cart/${id}`, {method: "DELETE"})
if (response.ok){
    const {CartItemId} = await response.json()
    dispatch(removeFromCart(CartItemId))
}else{
    const data = await response.json()
    return data.errors;

}

}

export const updateCartItemThunk = (id) => async (dispatch)=>{
    const response = await fetch(`/api/store/cart/${id}`,{ method: "PATCH"})
    if (response.ok){
        const {CartItem} = await response.json()
        dispatch(updateCartItem(CartItem))
    }else{
        const data = await response.json()
        return data.errors
    }

}

const initialState = {}
function cartReducer(state = initialState, action){
    switch(action.type){
        case GET_CART:{
            const newState = {...state}
            action.payload.forEach((item)=> newState[item.id]= item)
            return newState
        }
        case ADD_TO_CART:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case REMOVE_FROM_CART:{
            const newState = {...state}
            delete newState[action.payload]
            return {...newState}
        }
        case UPDATE_CART_ITEM:{
            const newState ={...state}
            newState[action.payload.id] = action.payload
            return {...newState}
        }
        default:
            return state
    }

}

export default cartReducer