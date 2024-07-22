import { useState } from "react";
import { useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [block, setBlock] = useState(false)
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false)
 
  useEffect(() => {
    let errObj = {}

    //comparison regex : [any char, num, symbol] + @[any char or num] + .[any char or num]
    //ex: demo@aa.io would match, as would demo@aa.i, but demo@aa. would not match, nor would demo@aa and so on


    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    if (
      email.length === 0 ||
      email.length > 65 ||
      !email.match(validRegex) ||
      password.length < 6
    ) {
      setBlock(true);
    } else {
      setBlock(false);
    }

    if (email.length === 0) errObj.email = "Please provide a valid Email";
    if (email.length > 65) errObj.email = "Email must be 65 characters or less";
    if (!email.match(validRegex)) errObj.email = "Please provide a valid Email";
    if (password.length < 6) errObj.password = "Please provide a password of at least 6 characters";

    setErrors(errObj)
    // console.log(errors)
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if(!Object.values(errors).length){

      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
      );
      console.log(serverResponse)
  
  
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        navigate('/memberships')
      }
    }
  };
  const demoUserLogIn = () =>{
    navigate('/memberships')
    return dispatch(thunkLogin({email:'marnie@aa.io', password: 'password'}))
 }

  return (
    <div className='modal-cont-page'>
      <h1>Log In</h1>
      <form className='l-form' onSubmit={handleSubmit}>
        <label id='pass'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.email && <p className='errors'>* {errors.email}</p>}
        <label id='pass'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.password && <p className='errors'>* {errors.password}</p>}
        <div className="buttons-signup">

        <button type="submit" className = 'membership-button archivo-black-regular' onClick={handleSubmit}>Log In</button>

        <div id='demo-login' className = 'membership-button archivo-black-regular' onClick={demoUserLogIn}>Demo User</div>
        <NavLink to='/signup'>Create Account</NavLink>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
