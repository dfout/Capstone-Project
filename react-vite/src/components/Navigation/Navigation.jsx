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
  const comingSoon = () =>{
    alert("Under construction, Thank you for your patience")
  }

  return (
    <>
    <div className='navbar'>
        <div id='name-container'>
        <NavLink to='/' className='nav-links' id='musee'>MUSEUM SITE</NavLink>
        </div>
      
      <div className='navbar-links'>
        {/* {sessionUser != null && sessionUser.isMember == false && (
             <NavLink className='nav-links archivo-black-regular underline' to='/memberships'>Become a member</NavLink>
        )
        } */}
        {sessionUser == null && (
                      <NavLink className='nav-links new underline' to='/memberships'>become a member</NavLink>
        ) }
      {sessionUser && !member["MembershipType"] &&
            <NavLink className='nav-links new underline' to='/memberships'>become a member</NavLink>
      
      }

      
      
      <button className='new ' onClick={handleClick}id='tickets-button'>tickets</button>
      

      
      <ProfileButton />
    
    </div>
    
    </div>
    <ul className='other-links'>
    <li>
      {/* <NavLink className='nav-links archivo-black-regular underline'to='/exhibitions'>Exhibitions</NavLink> */}
      </li>
      <li>
      <NavLink to='/events' className='nav-links new underline'>Events </NavLink>
      </li>
      <li>
      <NavLink onClick={comingSoon} className='nav-links new underline'>Art & Artists </NavLink>
      </li>
    <li>
      <NavLink className='nav-links  new underline'to='/store'>Store</NavLink>
      </li>
      <li>
      <NavLink onClick={comingSoon} className='nav-links new underline'>Games & Community</NavLink>
      </li>
    </ul>
    </>

  );
}

export default Navigation;
