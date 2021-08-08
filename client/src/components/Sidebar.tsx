import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Sidebar.css";
import logo from "../images/logo.png";
import adsIcon from "../images/ads.png";
import botsIcon from "../images/bots.png";
import statisticsIcon from "../images/statistics.png";

const SidebarItems = [
  {
    name: "Ads",
    route: "/ads",
    icon: adsIcon,
  },
  {
    name: "Bots",
    route: "/bots",
    icon: botsIcon,
  },
  {
    name: "Statistics",
    route: "/statistics",
    icon: statisticsIcon,
  },
];

/**
 * Sidebar menu
 */
const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logoText">
          <img src={logo} alt="logo" className="logo"></img>
          <span>Ad Transparency</span>
        </div>
        {SidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            activeClassName={item.route === "/" ? "" : "active"}
            className="link"
          >
            <div className="sidebar-item" key={item.name}>
              <img
                className="sidebarIcon"
                src={item.icon}
                alt={item.name}
              ></img>
              <span>{item.name}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
