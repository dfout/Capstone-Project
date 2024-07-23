import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { getItemThunk } from "../../redux/item"
import { getItemReviewsThunk } from "../../redux/review"
import OpenModalButton from "../OpenModalButton"
import { DeleteReviewModal } from "../DeleteReviewModal/DeleteReviewModal"
import { getReviewsList } from "../../redux/review"
import './itemDetailPage.css'
import { useModal } from '../../context/Modal';
// import { addToCartThunk } from "../../redux/cart"
import { getOrdersThunk } from "../../redux/order"
import LoginFormModal from "../LoginFormModal"
import ReviewModal from "../ReviewModal"

function ItemDetailPage(){
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    let {id} = useParams()
    id = Number(id)

    const item = useSelector((state)=>state.items[id])
    let reviews = (useSelector(getReviewsList))
    // let reviews = useSelector((state)=>state.reviews)
    console.log(reviews, "REVIEWS")
    let sessionUser = useSelector((state) => state.session.user);
    // const orders = useSelector((state)=>state.orders)

    reviews = [...reviews].reverse();
    let numReviews = reviews.length

    const [timeCheck, setTimeCheck] = useState(true);
    const closeMenu = useModal();

    useEffect(()=>{
        dispatch(getItemThunk(id))
        dispatch(getItemReviewsThunk(id))
        // dispatch(getOrdersThunk())

    },[dispatch,id])

    let avgRating = reviews.reduce((accumulator, currentItem)=> accumulator + currentItem.rating, 0)
    avgRating = (avgRating / numReviews).toFixed(2)

    useEffect(() => {
        let timeout;
       
        if (!item || !item.Images || !item.Reviews || !reviews ) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }
    
        return () => clearTimeout(timeout);
    }, [item, reviews]);

    if (!item || !item.Images || !item.Reviews || !reviews && timeCheck) return <h1>Loading...</h1>;
    else if (!item || !item.Images || !item.Reviews || !reviews && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // const handleAddToCart = async(id)=>{
    //     await dispatch(addToCartThunk(id))
    //     navigate('/cart')
    // }

    //! For later implementation: When the user can purchase an item
    //* Need  to check if the user has purchased the item

    // const hasPurchased = (orders) =>{
    //     const ordersArr = Object.values(orders)
    //     for (let order of ordersArr){
    //        let items = order["OrderedItems"]
    //        for (let item of items){
    //         if (item.id == id){
    //             return true
    //         }

    //        }
    //     }
    //     return false

    // }
    // Need to check if the user has already reviewed the item:

    const hasReviewed = (reviews)=>{
        if(!sessionUser){
            return true
        }
        const reviewsArr = Object.values(reviews)
        for (let review of reviewsArr){
            if (review.ownerId == sessionUser.id){
                return true
            }
        }
        return false

    }

    //* Function that returns a bool for each of these conditions. 

    // const canReview = (hasPurchased, hasReviewed, orders, reviews)=>{
    //    if (hasPurchased(orders) && !hasReviewed(reviews)) return true
    //    else{
    //     return false
    //    }
    // }

    const canReview = (hasReviewed, reviews) =>{
        return !hasReviewed(reviews)
    }


    return(
        <>
        <div className='item-imgs-info'>

        <div className='item-imgs-container'>


        {item.Images && item.Images.map((image)=>(
            <div key={image.id}className='item-img-container'>
                            <img className='item-detail-image' key={image.id} src={image.url}/>

            </div>

        ))}
        </div>
        <div className='item-info'>

        <h2>{item.name}</h2>
        <span>{avgRating}</span>
        <span>${item.price.toFixed(2)}</span>
        <p>{item.description}</p>
        {/* <button onClick={()=>handleAddToCart(item.id)}>Add to Cart</button> */}
        </div>
        </div>
        <section>
        <ul className='item-reviews'>
            {console.log(reviews, "REVIEWS HERE")}
            {!sessionUser && (
        //  <button id='review-button' disabled={true}>Sign-in to post a Review</button>
        <div id= 'post-your-review-button'>
                    <OpenModalButton buttonText='Sign-in to post a Review' className='modal-text'onButtonClick={closeMenu} modalComponent={<LoginFormModal/>}/>

        </div>

        )
        }
        {canReview(hasReviewed, reviews)&&(
            <div id='post-your-review-button'>
            <OpenModalButton id='review-button' disabled={false} buttonText={'Post Your Review'} onButtonClick={closeMenu} style={{alignSelf:'left'}} modalComponent={<ReviewModal itemId={item.id}/>}/>

</div>

        )}
            {reviews.length != 0 && reviews?.map(({ id, ownerId, User, rating, review, createdAt }) => {
                const date = new Date(createdAt);
                const monthName = monthNames[date.getMonth()];
                const year = date.getFullYear();

                

                return (
                    <li className='review-tile' key={id}>
                        <h4>{User ? User.firstName : 'Anonymous'}</h4>
                        <p className='review-info'>{monthName} {year}</p>
                        <p className='review-info'>{rating} stars</p>
                        <p className='review-info'>{review}</p>
                        {sessionUser!= null && sessionUser.id === ownerId && 
                        (<OpenModalButton id="delete-button" buttonText={'Delete'} onButtonClick={closeMenu} modalComponent={<DeleteReviewModal reviewId={id} review={review} rating={rating} createdAt={createdAt} itemName={item.name} itemId={item.id}/>}/>)}
                    </li>
                );
            })}
        </ul>

        </section>
        
        </>
    )

}
export default ItemDetailPage