import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../../firebase/firebase.utils";
import "./profile-menu.styles.css";

const ProfileMenu = ({ currentUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="profile-menu" ref={dropdownRef}>
      <div className="profile-icon" onClick={toggleDropdown}>
        <span className="display-name">{currentUser?.displayName}</span>
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="profile-image"
            className="profile-image"
          />
        ) : (
          <FaUserCircle size={30} />
        )}
      </div>
      {dropdownVisible && (
        <div className="profile-dropdown">
          <div className="option" onClick={async () => await auth.signOut()}>
            SIGN OUT
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
