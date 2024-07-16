
import { useDispatch } from "react-redux"

import {useModal} from '../../context/Modal'


import { deleteReviewThunk } from "../../redux/review"

export const DeleteReviewModal = ({reviewId})=>{
    console.log("REVIEW ID",reviewId)
    const dispatch = useDispatch();
    const {closeModal} = useModal()

    const handleDelete = async() =>{
        
        console.log(reviewId)
        const response = await dispatch(deleteReviewThunk(reviewId))
        
        if(response == true){
            closeModal();
        }else{
            return null
        }
    }

    return (
        <>
        <button onClick={handleDelete}>Yes (Delete Review)</button>
        <button onClick={closeModal}>No(Keep Review)</button>
        </>

    )
}