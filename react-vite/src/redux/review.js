import { createSelector } from "reselect"

const GET_REVIEWS = '/reviews/getReviews'
const GET_ITEM_REVIEWS = '/item/getReviews'
const POST_REVIEW = '/reviews/PostReview'
const DELETE_REVIEW = '/reviews/deleteReview'
const UPDATE_REVIEW = '/reviews/updateReview'


const getReviews = (reviews) =>({
    type:GET_REVIEWS, 
    payload:reviews
})

const getItemReviews = (reviews)=>({
    type:GET_ITEM_REVIEWS,
    payload: reviews
})

const postReview = (review) =>({
    type:POST_REVIEW, 
    payload:review
})

const deleteReview = (id)=>({
    type:DELETE_REVIEW, 
    payload:id
})

const updateReview = (review) =>({
    type:UPDATE_REVIEW, 
    payload:review
})

export const getUserReviewsThunk = ()=> async (dispatch) =>{
    const response = await fetch('/api/users/reviews')
    if(response.ok){
        const {Reviews} = await response.json()
        dispatch(getReviews(Reviews))
    }else{
    const data = response.json()
    return data.errors
    }

}

//! Might not technically have to do this. But I need to make sure if I change reviews from the items page that a new slice of state is made so that it re-renders. Think then I need to have a separate slice of state to be honest? 
export const getItemReviewsThunk = (id)=> async(dispatch) =>{
    const response = await fetch(`/api/store/items/${id}/reviews`)
    if (response.ok){
        const {Reviews} = await response.json()
    dispatch(getItemReviews(Reviews))
    }else{
        const data = await response.json()
        return data.errors
    }
}

export const postReviewThunk = ()=> async (dispatch) =>{
    const response = await fetch(`/api/store/items/${id}`, {method:"POST"})
    if (response.ok){
        const {Review} = await response.json()
        dispatch(postReview(Review))
    }else{
        const data = await response.json()
        return data.errors
    }
}
export const deleteReviewThunk = ()=> async (dispatch) =>{
    const response = await fetch(`/api/store/items/${id}`, {method:"DELETE"})
    if (response.ok){
        const {review_id} = await response.json()
        dispatch(deleteReview(review_id))
    }else{
        const data = response.json()
        return data.errors
    }
}
export const updateReviewThunk = ()=> async (dispatch) =>{
    const response = await fetch(`/api/store/items/${id}`)
    if (response.ok){
        const {Review} = await response.json()
        dispatch(updateReview(Review))
    }else{
        const data = response.json()
        return data.errors
    }

}

export const getReviewsList = createSelector(
    (state)=> state.reviews,
    (reviews)=> Object.values(reviews)
)

const initialState = {}

function reviewsReducer (state=initialState, action){
    switch(action.type){
        case GET_REVIEWS:{
            const newState = {...state}
            action.payload.forEach((review)=>newState[review.id]= review)
            return newState
        }
        case GET_ITEM_REVIEWS:{
            const newState = {...state}
            action.payload.forEach((review)=>newState[review.id]=review)
        }
        case POST_REVIEW:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_REVIEW:{
            const newState = {...state}
            delete newState[action.payload]
            return {...newState}
        }
        case UPDATE_REVIEW:{
            const newState = {...state}
            newState[action.payload.id]= action.payload
            return newState
        }
        default:
            return state
    }

}

export default reviewsReducer