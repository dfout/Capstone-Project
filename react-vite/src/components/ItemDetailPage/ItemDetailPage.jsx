import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getItemThunk } from "../../redux/item";
import { getItemReviewsThunk } from "../../redux/review";
import OpenModalButton from "../OpenModalButton";
import { DeleteReviewModal } from "../DeleteReviewModal/DeleteReviewModal";
import { getReviewsList } from "../../redux/review";
import "./itemDetailPage.css";
import { useModal } from "../../context/Modal";
// import { addToCartThunk } from "../../redux/cart"
// import { getOrdersThunk } from "../../redux/order"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginFormModal from "../LoginFormModal";
import ReviewModal from "../ReviewModal";
import { IoIosStar } from "react-icons/io";

function ItemDetailPage() {
    const dispatch = useDispatch();
    let { id } = useParams();
    id = Number(id);
  
    const item = useSelector((state) => state.items[id]);
    let reviews = useSelector(getReviewsList);
    let sessionUser = useSelector((state) => state.session.user);
  
    reviews = [...reviews].reverse();
    let numReviews = reviews.length;
  
    const [timeCheck, setTimeCheck] = useState(true);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State for description toggle
    const closeMenu = useModal();
  
    useEffect(() => {
      dispatch(getItemThunk(id));
      dispatch(getItemReviewsThunk(id));
    }, [dispatch, id]);
  
    let avgRating = reviews.reduce(
      (accumulator, currentItem) => accumulator + currentItem.rating,
      0
    );
    avgRating = (avgRating / numReviews).toFixed(2);
  
    useEffect(() => {
      let timeout;
  
      if (!item || !item.Images || !item.Reviews || !reviews) {
        timeout = setTimeout(() => setTimeCheck(false), 3000);
      }
  
      return () => clearTimeout(timeout);
    }, [item, reviews]);
  
    if (!item || !item.Images || !item.Reviews || (!reviews && timeCheck))
      return <h1>Loading...</h1>;
    else if (!item || !item.Images || !item.Reviews || (!reviews && !timeCheck))
      return <h1>Sorry, please refresh the page</h1>;
  
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const hasReviewed = (reviews) => {
      if (!sessionUser) {
        return true;
      }
      const reviewsArr = Object.values(reviews);
      for (let review of reviewsArr) {
        if (review.ownerId == sessionUser.id) {
          return true;
        }
      }
      return false;
    };
  
    const canReview = (hasReviewed, reviews) => {
      return !hasReviewed(reviews);
    };
  
    const truncateText = (text, limit) => {
      if (text.length <= limit) return text;
      return text.substring(0, limit) + "...";
    };
  
    const toggleDescription = () => {
      setIsDescriptionExpanded((prev) => !prev);
    };

    // const amtOfStars = (nums) =>{
        
    //     return(
    //         <>
    //         <IoIosStar />
    //         <IoIosStar />
    //         </>
    //     )

    // }
  
    return (
      <div className="itemDetail-cont">
        <div className="item-imgs-info">
          <div className="item-imgs-container">
            {item.Images &&
              item.Images.map((image) => (
                <div key={image.id} className="item-img-container">
                  <img
                    className="item-detail-image"
                    key={image.id}
                    src={image.url}
                  />
                </div>
              ))}
          </div>
          <div className="item-info">
            <h2>{item.name}</h2>
            <IoIosStar/>
            <span>{avgRating}</span>
            <span>${item.price.toFixed(2)}</span>
            <p className="description">
              {isDescriptionExpanded
                ? item.description
                : truncateText(item.description, 500)}
                {item.description.length > 500 &&(

              <span id='pointer' className="toggle-button" onClick={toggleDescription}>
                {isDescriptionExpanded ? "Read Less" : "More"}
              </span>
                )}
            </p>
          </div>
        </div>
        <section className='revs'>
        <h2>Reviews</h2>
          <ul className="item-reviews">
            {!sessionUser && (
              <div id="post-your-review-button">
                <OpenModalButton
                  buttonText="Sign-in to post a Review"
                  className="modal-text"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
            )}
            {canReview(hasReviewed, reviews) && (
              <div id="post-your-review-button">
                <OpenModalButton
                  id="review-button"
                  disabled={false}
                  buttonText={"Post Your Review"}
                  onButtonClick={closeMenu}
                  style={{ alignSelf: "left" }}
                  modalComponent={<ReviewModal itemId={item.id} />}
                />
              </div>
            )}
            
            {reviews.length !== 0 &&
              reviews.map(({ id, ownerId, User, rating, review, createdAt }) => {
                const date = new Date(createdAt);
                const monthName = monthNames[date.getMonth()];
                const year = date.getFullYear();
  
                return (
                  <li className="review-tile" key={id}>
                    <h4>{User ? User.firstName : "Anonymous"}</h4>
                    <p className="review-info">
                      {monthName} {year}
                    </p>
                    {Array.from({ length: rating }).map((_, index) => (
                      <IoIosStar key={index} />
                    ))}
                    <p className="review-info">{rating} stars</p>
                    <p className="review-info">{review}</p>
                    {sessionUser != null && sessionUser.id === ownerId && (
                      <OpenModalButton
                        id="delete-button"
                        buttonText={"Delete"}
                        onButtonClick={closeMenu}
                        modalComponent={
                          <DeleteReviewModal
                            reviewId={id}
                            review={review}
                            rating={rating}
                            createdAt={createdAt}
                            itemName={item.name}
                            itemId={item.id}
                          />
                        }
                      />
                    )}
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
    );
  }
export default ItemDetailPage;
