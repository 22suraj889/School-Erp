import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import "./Navbar.css";
import SearchComponent from "./SearchComponent";
import { useUser } from "../Context/UserAuthContext";
import ButtonComponent from "./ButtonComponent";

const Navbar = ({ setIsAuthenticated }) => {
  const dropdownRef = useRef(null);
  const dropdowndetailRef = useRef(null);
  const [showLogout, setShowLogout] = useState(false);
  const [showDetails, setShowDetails] = useState(false)
  const handleClick = () => {
    setShowLogout(!showLogout);
  };
  const { userData, logoutUser } = useUser();
  useEffect(() => {}, [userData]);

  const handleLagout = () => {
    setIsAuthenticated(false);
    logoutUser();
  };

  const handleQuery = () => {
    setShowDetails(!showDetails);
  }

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

  useEffect(() => {
    const handleClickOutside2 = (event) => {
      if (
        dropdowndetailRef.current &&
        !dropdowndetailRef.current.contains(event.target) &&
        !event.target.closest(".query-bar")
      ) {
        setShowDetails(false); 
      }
    };
  
    // Attach the event listener on mount
    document.addEventListener("click", handleClickOutside2);
  
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside2);
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
        <img src="assets/icons/question-icon.png" alt="question" className="query-bar cursor-pointer" onClick={handleQuery} />
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
      {
        showDetails && (
          <div
          ref={dropdowndetailRef}
          className="flex w-full justify-end h-[150px] logout-dropdown"
        >
         <div className="flex gap-2 px-10 py-5 items-center border border-solid border-black">
            <h3 className="font-[500] text-xl">Email :</h3>
            <p className="text-lg">chappidisrinivasa1@gmail.com</p>
          </div> 
        </div>
        )
      }
    </nav>
  );
};

export default Navbar;
