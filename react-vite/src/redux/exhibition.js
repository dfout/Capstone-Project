const GET_EXHIBITIONS = '/exhibitions/getAll'
const GET_EXHIBITION = '/exhibitions/getOne'

const getExhibitions = (exhibitions)=>({
    type:GET_EXHIBITIONS, 
    payload: exhibitions
})

const getOneExhibition = (exhibition)=>({
    type:GET_EXHIBITION,
    payload:exhibition
})


export const getExhibitionsThunk = () => async (dispatch)=>{
    const response = await fetch(`/api/exhibitions/`)

    if (response.ok){
        const {Exhibitions} = await response.json()
        dispatch(getExhibitions(Exhibitions))
    }else{
        const data = await response.json()
        return data.errors
    }
}

export const getExhibitionThunk = (id) => async (dispatch)=>{
    const response = await fetch(`/api/exhibtions/${id}`)
    if (response.ok){
        const {Exhibition} = await response.json()
        dispatch(getOneExhibition(Exhibition))
    }else{
        const data = await response.json()
        return data.errors
    }
}


const initialState = {}

function exhibitionReducer(state=initialState, action){
    switch(action.type){
        case GET_EXHIBITIONS:{
            const newState = {...state}
            action.payload.forEach((exhibition)=>newState[exhibition.id]= exhibition)
            return newState
        }
        case GET_EXHIBITION:{
            const newSpotState = {...state}
            const exhibition = action.payload
            newSpotState[action.payload.id] = exhibition;
            return {...newSpotState}

        }
        default:
            return state
    }

}


export default exhibitionReducer