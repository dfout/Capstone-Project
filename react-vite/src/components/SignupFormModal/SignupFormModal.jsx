import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    let errObj = {}

    //comparison regex : [any char, num, symbol] + @[any char or num] + .[any char or num]
    //ex: demo@aa.io would match, as would demo@aa.i, but demo@aa. would not match, nor would demo@aa and so on


    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    // if (
    //   email.length === 0 ||
    //   email.length > 65 ||
    //   !email.match(validRegex) ||
    //   username.length < 4 ||
    //   username.length > 30 ||
    //   password.length < 6 ||
    //   password !== confirmPassword
    // ) {
    //   setBlock(true);
    // } else {
    //   setBlock(false);
    // }
    if (firstName.length === 0) errObj.firstName = "Please provide your first name"
    if (lastName.length === 0) errObj.lastName = "Please provide your last name"
    if (email.length === 0) errObj.email = "Please provide a valid Email";
    if (!email.match(validRegex)) errObj.email = "Please provide a valid Email";
    if (email.length > 65) errObj.email = "Email must be 65 characters or less";
    if (username.length < 4) errObj.username = "Please provide a Username of at least 4 characters";
    if (username.length > 30) errObj.username = "Username must be 30 characters or less";
    if (password.length < 6) errObj.password = "Please provide a password of at least 6 characters";
    if (password !== confirmPassword) errObj.confirmPassword = "Please ensure both passwords match";

    setErrors(errObj)
    // console.log(errors)
  }, [email, username, password, confirmPassword, firstName, lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    if (!Object.values(errors).length){

      const serverResponse = await dispatch(
        thunkSignup({
          email,
          username,
          password,
          first_name:firstName,
          last_name: lastName
        })
      );
  
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    }

  };

  return (
    <>
      <h1>Sign Up</h1>
      {hasSubmitted && errors.server && <p className ='errors'>* {errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name<input type='text' value={firstName} onChange={(e)=> setFirstName(e.target.value)} required /></label>
        {hasSubmitted && errors.firstName && <p className='errors'>* {errors.firstName}</p>}
        <label>Last Name<input type='text' value={lastName} onChange={(e)=> setLastName(e.target.value)} required /></label>
        {hasSubmitted && errors.lastName && <p className='errors'>* {errors.lastName}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.email && <p className ='errors'>* {errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.username && <p className ='errors'>* {errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.password && <p className ='errors'>* {errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.confirmPassword && <p className ='errors'>* {errors.confirmPassword}</p>}
        <button type="submit" className='membership-button archivo-black-regular'>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
