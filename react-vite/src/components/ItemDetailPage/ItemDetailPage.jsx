import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { getItemThunk } from "../../redux/item"
import { getItemReviewsThunk } from "../../redux/review"
import OpenModalButton from "../OpenModalButton"
import { DeleteReviewModal } from "../DeleteReviewModal/DeleteReviewModal"
import { getReviewsList } from "../../redux/review"

function ItemDetailPage(){
    const dispatch = useDispatch()
    let {id} = useParams()
    id = Number(id)

    const item = useSelector((state)=>state.items[id])
    let reviews = (useSelector(getReviewsList))
    // let reviews = useSelector((state)=>state.reviews)
    console.log(reviews, "REVIEWS")
    let sessionUser = useSelector((state) => state.session.user);

    reviews = [...reviews].reverse();
    let numReviews = reviews.length

    const [timeCheck, setTimeCheck] = useState(true);

    useEffect(()=>{
        dispatch(getItemThunk(id))
        dispatch(getItemReviewsThunk(id))

    },[dispatch,id])

    let avgRating = reviews.reduce((accumulator, currentItem)=> accumulator + currentItem.stars, 0)
    avgRating = (avgRating / numReviews).toFixed(2)

    useEffect(() => {
        let timeout;
       
        if (!item || !item.Images || !item.Reviews || !reviews || !reviews[0].User.firstName) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }
    
        return () => clearTimeout(timeout);
    }, [item]);

    if (!item || !item.Images || !item.Reviews || !reviews || !reviews[0].User.firstName && timeCheck) return <h1>Loading...</h1>;
    else if (!item || !item.Images || !item.Reviews || !reviews || !reviews[0].User.firstName && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return(
        <>
        {item.Images && item.Images.map((image)=>(
            <img key={image.id} src={image.url}/>
        ))}
        <h2>{item.name}</h2>
        <span>{item.avgRating}</span>
        <span>{item.price}</span>
        <p>{item.description}</p>
        <section>
        <ul className='item-reviews'>
            {console.log(reviews, "REVIEWS HERE")}
            {reviews.length != 0 && reviews?.map(({ id, ownerId, User, stars, review, createdAt }) => {
                const date = new Date(createdAt);
                const monthName = monthNames[date.getMonth()];
                const year = date.getFullYear();

                console.log(User, "USER")

                return (
                    <li className='review-tile' key={id}>
                        <h4>{firstName}</h4>
                        <p className='review-info'>{monthName} {year}</p>
                        <p className='review-info'>{stars} stars</p>
                        <p className='review-info'>{review}</p>
                        {sessionUser.id === ownerId && 
                        (<OpenModalButton id="delete-button" buttonText={'Delete'} onButtonClick={closeMenu} modalComponent={<DeleteReviewModal reviewId={id}/>}/>)}
                    </li>
                );
            })}
        </ul>

        </section>
        
        </>
    )

}
export default ItemDetailPage