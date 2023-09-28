import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreatePost from "../PostPages/CreatePost";
import "./index.css";
import {
  darkModeHomeIcon,
  darkModeFilledInHomeIcon,
  darkModeExploreIcon,
  darkModeFilledInExploreIcon,
  darkModeFilledInPostIcon,
  darkModePostIcon,
} from "./Navicons";
import ProfileButton from "./ProfileButton";
import image from "./svgexport-17.png";
import SearchBar from "../test/SearchBar";

const NavBar = () => {

  const user = useSelector((state) => state.session.user);


  const [showModal, setShowModal] = useState(false);
  const [houseColor, setHouseColor] = useState(darkModeFilledInHomeIcon);
  const [postIconColor, setPostIconColor] = useState(darkModePostIcon);
  const [exploreIconColor, setExploreIconColor] = useState(darkModeExploreIcon);
  const [profileStatus, setProfileStatus] = useState(false);

  const openProfileDropdown = () => {
    setProfileStatus(true)
  }

  const openModal = () => {
    setShowModal(true);
  };
  const logo = (
    <img
      src="https://fontmeme.com/permalink/220601/86a21de467499ff0a91e214d1a326624.png"
      id="pixtagram-logo"
      alt="pixtagram"
      border="0"
    ></img>
  );

  const removeIconColor = () => {
    setHouseColor(darkModeHomeIcon);
    setPostIconColor(darkModePostIcon);
    setExploreIconColor(darkModeExploreIcon);
  };

  const fillInHouse = (e) => {
    e.stopPropagation();
    removeIconColor();
    setHouseColor(darkModeFilledInHomeIcon);
    setProfileStatus(false);
  };

  const fillInPost = (e) => {
    e.stopPropagation();
    removeIconColor();
    setPostIconColor(darkModeFilledInPostIcon);
    setProfileStatus(false);
    openModal();
  };

  const fillInExplore = (e) => {
    e.stopPropagation();
    removeIconColor();
    setExploreIconColor(darkModeFilledInExploreIcon);
    setProfileStatus(false);
  };


  return (
    <div className="nav-bar">
      <div className="child-nav-bar-container">
        <div id="nav-bar-container">
          <div className="logo-container">
            <NavLink to="/" exact={true}>
              {logo}
            </NavLink>
          </div>
          <div className="search-parent-container">
            <div className="search-bar">
              <div
                style={{ background: `url(${image}) no-repeat 13px` }}
                className="search-form"
              >
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="icons">
            <NavLink
              className="icon-links"
              to="/"
              exact={true}
              id="house-icon-id"
              onClick={(e) => fillInHouse(e)}
            >
              {houseColor}
            </NavLink>
            <div className="icon-links" onClick={(e) => fillInPost(e)}>
              {postIconColor}
            </div>
            <NavLink
              className="icon-links"
              to="/explore-page"
              exact={true}
              id="explore-icon-id"
              onClick={(e) => fillInExplore(e)}
            >
              {exploreIconColor}
            </NavLink>
            <button className="profile-button" onClick={() => openProfileDropdown()}>
              <img src={user.profile_pic_url} alt='user'></img>
            </button>
            {profileStatus && (
              <>
                <div
                  className="outerDropDown"
                  onClick={() => setProfileStatus(false)}
                ></div>
                <ProfileButton status={() => setProfileStatus(false)} />
              </>
            )}
          </div>
        </div>
        <div>
          {showModal && (
            <CreatePost
              hideModal={() => setShowModal(false)}
              changePostIcon={() => setPostIconColor(darkModePostIcon)}
            />
          )}
        </div>
      </div>
    </div>
  )
};

export default NavBar;
