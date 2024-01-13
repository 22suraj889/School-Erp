import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import "./Navbar.css";
import SearchComponent from "./SearchComponent";
import { useUser } from "../Context/UserAuthContext";
import ButtonComponent from "./ButtonComponent";

const Navbar = ({ setIsAuthenticated }) => {
  const dropdownRef = useRef(null);
  const [showLogout, setShowLogout] = useState(false);
  const handleClick = () => {
    setShowLogout(!showLogout);
  };
  const { userData, logoutUser } = useUser();
  useEffect(() => {}, [userData]);

  const handleLagout = () => {
    setIsAuthenticated(false);
    logoutUser();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".avatar-container")
      ) {
        setShowLogout(false);
      }
    };

    // Attach the event listener on mount
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar flex justify-between items-center sticky top-0 z-20 py-2">
      <div className="flex items-center ml-4">
        <img src="assets/icons/navbar-logo.png" alt="logo" />
        <p className="text-white">Indian Public School</p>
      </div>
      <div>
        <SearchComponent />
      </div>
      <div className="flex mr-4 justify-around items-center gap-5">
        <select name="date" id="date" className="px-2 py-1 rounded-md">
          <option value="2023-2024">2023-2024</option>
          <option value="2022-2023">2022-2023</option>
        </select>
        <img src="assets/icons/question-icon.png" alt="question" />
        <div className="avatar-container">
          <Avatar
            onClick={handleClick}
            sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}
          ></Avatar>
        </div>
      </div>
      {showLogout && (
        <div
          ref={dropdownRef}
          className="flex w-full justify-end h-[150px] logout-dropdown"
        >
          <div className="flex flex-col gap-2 px-10 py-5 items-center border border-solid border-black">
            <h3 className="font-[500] text-xl">{userData.role}</h3>
            <p className="text-lg">{userData.userName}</p>
            <ButtonComponent
              buttonText={"Logout"}
              onClickButton={handleLagout}
              isUpdateDisabled={false}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
