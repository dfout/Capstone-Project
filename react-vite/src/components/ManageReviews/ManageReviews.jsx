
import { useDispatch, useSelector } from "react-redux"
import { getUserReviewsThunk } from "../../redux/review"
import { useEffect } from "react"

function ManageReviews(){
    const dispatch = useDispatch()
    const userReviews = useSelector((state)=>state.reviews)

    useEffect(()=>{
        dispatch(getUserReviewsThunk())
    },[dispatch])

    return (
        <>
        <h2>Your Reviews</h2>
        {Object.values(userReviews).map((review)=> (
            <div key={review.id} className='user-review-tile'>
                <h3>{review["Item"].name}</h3>
                <span>{review.rating}</span>
                <p>{review.review}</p>
                <span>Posted on {review.createdAt}</span>
                <button>Update</button>
                <button>Delete</button>
            </div>
        ))}
        
        </>
    )
}

export default ManageReviews