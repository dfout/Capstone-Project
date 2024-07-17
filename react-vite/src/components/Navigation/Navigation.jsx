import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <>
    <div className='navbar'>
        <div id='name-container'>
        <NavLink to='/' className='nav-links archivo-black-regular' id='musee'>Musée 4</NavLink>
        </div>
      
      <div className='navbar-links'>
    
      <NavLink className='nav-links archivo-black-regular underline' to='/memberships'>Memberships</NavLink>
      
      
      <button className='archivo-black-regular' to='/memberships'id='tickets-button'>Tickets</button>
      

      
      <ProfileButton />
    
    </div>
    
    </div>
    <ul className='other-links'>
    <li>
      <NavLink className='nav-links archivo-black-regular underline'to='/exhibitions'>Exhibitions</NavLink>
      </li>
      <li>
      <NavLink className='nav-links archivo-black-regular underline'to='/events'>Events</NavLink>
      </li>
      <li>
      <NavLink className='nav-links archivo-black-regular underline'to='/artists'>Art & Artists </NavLink>
      </li>
    <li>
      <NavLink className='nav-links archivo-black-regular underline'to='/store'>Store</NavLink>
      </li>
    </ul>
    </>

  );
}

export default Navigation;
