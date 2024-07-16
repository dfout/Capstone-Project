

const GET_ITEMS = '/store/getItems'
const GET_ONE_ITEM = '/store/getItem'

const getItems = (items)=>({
    type: GET_ITEMS, 
    payload: items
})

const getItem = (item) =>({
    type:GET_ONE_ITEM,
    payload: item
})




export const getItemsThunk = () => async (dispatch) => {
    const response = await fetch('/api/store/items/')
    if (response.ok){
        const {Items} = await response.json()
        dispatch(getItems(Items))
    }else{
        const data = await response.json()
        return data.errors
    }
}

export const getItemThunk = (id) =>async(dispatch) =>{
    const response = await fetch(`/api/store/items/${id}`)
    if (response.ok) {
        const {Item} = await response.json()
        dispatch(getItem(Item))
    }else{
        const data= await response.json()
        return data.errors;
    }

}



const initialState = {};

function itemReducer(state=initialState, action){
    switch(action.type){
        case GET_ITEMS:{
            const newState = {...state}
            action.payload.forEach((item)=> newState[item.id]= item)
            return newState
        }
        case GET_ONE_ITEM:{
            const newState = {...state}
            const item = action.payload
            newState[action.payload.id] = item
            return {...newState}

        }
        default:
            return state

    }
}


export default itemReducer