import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./Sidebar.css";

const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  padding: 5px 0px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 0px;
  text-decoration: none;
  font-size: 18px;
  outline: none;
`;

const SidebarLabel = styled.span`
  padding: 5px 20px;
  color: #9d9d9d;
`;

const DropdownLink = styled(Link)`
  background: #242424;
  height: 40px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;
`;

const SubMenu = ({ item,listOfSubMenuOpen, setListOfSubMenuOpen }) => {
  const [subnav, setSubnav] = useState(false);
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close the submenu when the location changes
    if (!listOfSubMenuOpen.includes(item.title)) {
      setSubnav(false);
      setActive(false);
    }
  }, [location, listOfSubMenuOpen, item.title]);


  const showSubnav = () => {
    setListOfSubMenuOpen([item.title])
    setSubnav(!subnav);
    setActiveStatus();
  };
  const setActiveStatus = () => {
    setActive(!active);
  };

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        className={active ? "activeDiv" : ""}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel className={location.pathname === item.path ? "activeSubM" : ""}>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
