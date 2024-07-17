import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className='navbar'>
      <ul className='navbar-links'>
      <li>
        <div id='name-container'>
        <NavLink to='/' className='nav-links archivo-black-regular' id='musee'>Musée 4</NavLink>
        </div>

        </li>
      <li>
      <NavLink className='nav-links archivo-black-regular' to='/memberships'>Memberships</NavLink>
      </li>
      <li>
      <button className='archivo-black-regular' to='/memberships'id='tickets-button'>Tickets</button>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
    <ul className='other-links'>
    <li>
      <NavLink className='nav-links archivo-black-regular'to='/store'>Store</NavLink>
      </li>
    </ul>


    </div>

  );
}

export default Navigation;
