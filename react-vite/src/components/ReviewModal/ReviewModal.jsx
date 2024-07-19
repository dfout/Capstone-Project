import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import { postReviewThunk } from "../../redux/review";
import { FaStar, FaRegStar } from "react-icons/fa";
import './ReviewModal.css'; // Ensure you import your CSS file

const ReviewModal = ({ itemId }) => {
  const dispatch = useDispatch();
//   const user = useSelector(state => state.session.user);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
//   const [reviewErrors, setReviewErrors] = useState("")
  const [filled, setFilled] = useState(0);
  const [active, setActive] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [beforeSubErrors, setBeforeSubErrors] = useState({})
  const { closeModal } = useModal();
  const ratings = [1, 2, 3, 4, 5];

  useEffect(() => {
    const errors = {};
    if (review.length > 9 && rating > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if(review.length < 10) errors.review = "Review must be at least 10 characters"
    if(review.length >= 10) errors.review = ""
    if(!rating) errors.rating = "Please enter a star rating by clicking on the stars"

    setErrors(errors)
  }, [review, rating]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setHasSubmitted(true);
    
    let review2={review,rating}

    const result = await dispatch(postReviewThunk(review2, itemId));

    if (result.message) {
      setErrors(result);
    } else {
      closeModal();
    }
  };

  const handleBlur = () =>{
    let errors ={}
    if(review.length < 10){
        errors.review = ("Review must be at least 10 characters")
    }
    if(review.length >=10){
        errors.review = ""
    }
    setBeforeSubErrors(errors)
    
  }

  return (
    <div className="create-review-cont">
      <h1>How is this product?</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          cols={30}
          minLength="30"
          value={review}
          name="review"
          placeholder="Leave your review here..."
          onChange={(e) =>{
            setReview(e.target.value)
            if(review.length >=10) beforeSubErrors.review = ""

          }}
          required
          onBlur={handleBlur}
        />
        {beforeSubErrors.review && <p>{beforeSubErrors.review}</p>}
        { hasSubmitted && errors.review && <p>{errors.review}</p>}
        <div className="star-rating">
          {ratings.map((rating, index) => {
            let starRating = index + 1;
            return (
              <label key={starRating}>
                <input 
                  type="radio" 
                  name="starRating" 
                  value={starRating} 
                  onClick={() => {
                    setRating(starRating);
                    setFilled(starRating);
                  }} 
                  onChange={() => setRating(starRating)}
                />
                <i 
                  onMouseEnter={() => setActive(starRating)}
                  onMouseLeave={() => setActive(0)}
                  style={{ color: active >= starRating || starRating <= filled ? "gold" : "grey" }}
                >
                  {active >= starRating || starRating <= filled ? <FaStar /> : <FaRegStar />}
                </i>
              </label>
            );
          })}
          <span>{rating} Stars</span>
          {hasSubmitted && errors.rating && <p>{errors.rating}</p>}
        </div>
        <button className="membership-button" disabled={disabled} type="submit">Submit Your Review</button>
      </form>
    </div>
  );
};

export default ReviewModal;