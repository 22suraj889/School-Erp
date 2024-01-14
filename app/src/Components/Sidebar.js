// Sidebar.js
import React from "react";
import styled from "styled-components";
import { SidebarData } from "../Database/SidebarData";
import { IconContext } from "react-icons/lib";
import SubMenu from "./SubMenu";
import "./Navbar.css"

const SidebarNav = styled.nav`
  background-image: linear-gradient(#333333, #333333);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 2.7rem;
  z-index: 10;
  overflow: auto;
  width: 25rem;
  border: none; /* Remove the border */
  padding: 0; /* Remove padding */
  padding-bottom: 40px;
`;

const SidebarWrap = styled.div`
  width: 100%;
  // overflow: hidden;
`;

const Sidebar = () => {
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <SidebarNav className="main-sidenavbar">
        <SidebarWrap className="sidebar-wrap">
          {/* <div>
            <img src="assets/images/logo.jpeg" className="w-full bg-gray-100 pb-10 pt-5" alt="sidebar-icon" />
          </div> */}
          {SidebarData.map((item, index) => (
            <div key={index} className="icon-parent" >
              {item.custonIcons}
              <SubMenu item={item} />
            </div>
          ))}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
