import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation() {

  const member = useSelector((state)=>state.member)
  const sessionUser = useSelector((state)=>state.session.user)
  const navigate=useNavigate()

  const handleClick = ()=>{
    navigate('/tickets')
  }


  return (
    <>
    <div className='navbar'>
        <div id='name-container'>
        <NavLink to='/' className='nav-links archivo-black-regular' id='musee'>Musée 4</NavLink>
        </div>
      
      <div className='navbar-links'>
        {/* {sessionUser != null && sessionUser.isMember == false && (
             <NavLink className='nav-links archivo-black-regular underline' to='/memberships'>Become a member</NavLink>
        )
        } */}
        {sessionUser == null && (
                      <NavLink className='nav-links archivo-black-regular underline' to='/memberships'>Become a member</NavLink>
        ) }
      {sessionUser && !member["MembershipType"] &&
            <NavLink className='nav-links archivo-black-regular underline' to='/memberships'>Become a member</NavLink>
      
      }

      
      
      <button className='archivo-black-regular' onClick={handleClick}id='tickets-button'>Tickets</button>
      

      
      <ProfileButton />
    
    </div>
    
    </div>
    <ul className='other-links'>
    <li>
      {/* <NavLink className='nav-links archivo-black-regular underline'to='/exhibitions'>Exhibitions</NavLink> */}
      </li>
      <li>
      {/* <NavLink className='nav-links archivo-black-regular underline'to='/events'>Events</NavLink> */}
      </li>
      <li>
      {/* <NavLink className='nav-links archivo-black-regular underline'to='/artists'>Art & Artists </NavLink> */}
      </li>
    <li>
      <NavLink className='nav-links archivo-black-regular underline'to='/store'>Store</NavLink>
      </li>
    </ul>
    </>

  );
}

export default Navigation;
