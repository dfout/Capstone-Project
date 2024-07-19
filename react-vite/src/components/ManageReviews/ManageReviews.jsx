
import { useDispatch, useSelector } from "react-redux"
import { getUserReviewsThunk } from "../../redux/review"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useModal } from '../../context/Modal';
import { DeleteReviewModal } from "../DeleteReviewModal/DeleteReviewModal"
import OpenModalButton from "../OpenModalButton"
import EditReviewModal from "../EditReviewModal";
import './ManageReviews.css'

function ManageReviews(){
    const dispatch = useDispatch()
    const reviews = useSelector((state)=>state.reviews)
    const closeMenu = useModal();

    useEffect(()=>{
        dispatch(getUserReviewsThunk())
    },[dispatch])

    const [timeCheck, setTimeCheck] = useState(true);

    useEffect(() => {
        let timeout;
       
        if (!reviews) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }
    
        return () => clearTimeout(timeout);
    }, [reviews]);

    if (!reviews && timeCheck) return <h1>Loading...</h1>;
    else if (!reviews && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

    return (
        <>
        <h2 className='manage-title'>Your Reviews</h2>
        <div className='manage-reviews'>
        
        {Object.values(reviews).map((review)=> (
            <div key={review.id} className='user-review-tile'>
                 {review["Item"] ? (
                        <>
                            <h3><Link to={`store/items/${review["Item"]}.id`} className=' item-review archivo-black-regular'>{review["Item"].name}
                            </Link></h3>
                            <span>{review.rating}</span>
                            <p>{review.review}</p>
                            <span>Posted on {review.createdAt}</span>
                            <OpenModalButton className='up-button' disabled={false} buttonText={'Edit'} onButtonClick={closeMenu} style={{alignSelf:'left'}} modalComponent={<EditReviewModal reviewId={review.id}/>}/>
                            <OpenModalButton className="button" buttonText={'Delete'} onButtonClick={closeMenu} modalComponent={<DeleteReviewModal reviewId={review.id}/>}/>
                        </>
                    ) : (
                        <p>Item data is missing</p>
                    )}
            </div>
        ))}
        
        </div>
        </>
    )
}

export default ManageReviews