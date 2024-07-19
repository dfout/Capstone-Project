
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import {useModal} from '../../context/Modal'
import './DeleteReviewModal.css'


import { deleteReviewThunk } from "../../redux/review"

export const DeleteReviewModal = ({reviewId,review, rating, createdAt, itemName, itemId})=>{
    console.log("REVIEW ID",reviewId, review)
    const dispatch = useDispatch();
    const {closeModal} = useModal()

    let date;
    let month;
    let year;
    let day;
    if (review.createdAt){
        date = new Date(review.createdAt);
        day = date.getDate()
        month = date.getMonth() + 1;
        if(month <10){
            month = `0${month}`
        }
        year = date.getFullYear();
    }

    if(createdAt){
        date = new Date(createdAt);
        day = date.getDate()
        month = date.getMonth() + 1;
        if(month <10){
            month = `0${month}`
        }
        year = date.getFullYear();
    }

    const handleDelete = async(reviewId) =>{
        
        console.log(reviewId)
        const response = await dispatch(deleteReviewThunk(reviewId))
        alert("Review successfully deleted")
        
        
        if(response == true){
            closeModal();
        }else{
            return null
        }
    
    }

    return (
        <div className='review-manage-buttons'>
            <h2 className="title">Delete Review?</h2>
            <div className='review-preview'>
                {review["Item"] ?(
                    <>
                <h3><Link to={`/store/items/${review["Item"].id}`} className=' item-review archivo-black-regular'>{review["Item"].name}
                            </Link></h3>
                <span>{review.rating}/5 stars</span>
                <p>{review.review}</p>
                <span>Posted: {month}/{day}/{year}</span>
                </>
                ):(
                    <>
                        <h3><Link to={`/store/items/${itemId}`} className=' item-review archivo-black-regular'>{itemName}
                        </Link></h3>
                    <span>{rating}/5 stars</span>
                    <p>{review}</p>
                    <span>Posted: {month}/{day}/{year}</span>
                    </>

                )}

            </div>
        <div className="buttons-cont">

        <button className='membership-button archivo-black-regular' onClick={()=>handleDelete(reviewId)}>Yes (Delete Review)</button>
        <button className='membership-button archivo-black-regular' onClick={closeModal}>No (Keep Review)</button>
        </div>
        </div>

    )
}