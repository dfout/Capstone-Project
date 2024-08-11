import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from "react-router-dom";
import './ProfileButton.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const member = useSelector((state)=>state.member)
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      <button className='profile-button archivo-black-regular' onClick={toggleMenu}>
      My account
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li className='reg'>{user.username}</li>
              <li className='reg'>{user.email}</li>
              <li>
                <button className='membership-button archivo-black-regular' onClick={logout}>Log Out</button>
              </li>
              <li><NavLink className='manage-link' to='user/reviews'>Manage Reviews</NavLink></li>
              {member.id  && (
                <li><NavLink className='manage-link' to='user/membership'>Manage Membership</NavLink></li>
              )}
              <li><NavLink to='/user/purchases' className='manage-link'>My Purchases</NavLink>
                
              </li>
              {/* <li><NavLink to='/user/points' className='manage-link'>My Points</NavLink>
                
                </li> */}
              
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
