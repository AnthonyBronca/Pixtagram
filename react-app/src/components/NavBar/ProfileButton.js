import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { profileDropDown, settingsDropDown } from "./Navicons";

const ProfileButton = ({status}) => {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);


  const logoutFunc = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(sessionActions.logout());
  };


  return (
    <div>
      <div className="dropdownmenu" onClick={() => status()}>
        <NavLink to={`/users/${user.id}`} className="dropdownOptions">
          <div className="dropdownIcon">{profileDropDown}</div>{" "}
          <div>Profile</div>
        </NavLink>
        <NavLink to={`/users/${user.id}/edit`} className="dropdownOptions">
          <div className="dropdownIcon">{settingsDropDown}</div> Settings
        </NavLink>
        <NavLink to={`/explore-page`} className="aboutus dropdownOptions'">
          About Us
        </NavLink>
        <button className="log-out-button" onClick={logoutFunc}>
          Log Out
        </button>
      </div>
    </div>
  );
};


export default ProfileButton;
