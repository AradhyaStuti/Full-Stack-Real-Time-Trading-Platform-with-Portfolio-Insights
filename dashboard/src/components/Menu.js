import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import GeneralContext from "./GeneralContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user } = useContext(GeneralContext);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      const frontendUrl =
        process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
      window.location.href = `${frontendUrl}/login`;
    } catch {
      window.location.href = "/";
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    { label: "Dashboard", path: "/", index: 0 },
    { label: "Orders", path: "/orders", index: 1 },
    { label: "Holdings", path: "/holdings", index: 2 },
    { label: "Positions", path: "/positions", index: 3 },
    { label: "Funds", path: "/funds", index: 4 },
    { label: "Apps", path: "/apps", index: 5 },
  ];

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="Logo" />
      <div className="menus">
        <ul>
          {menuItems.map((item) => (
            <li key={item.index}>
              <Link
                style={{ textDecoration: "none" }}
                to={item.path}
                onClick={() => handleMenuClick(item.index)}
              >
                <p
                  className={
                    selectedMenu === item.index ? activeMenuClass : menuClass
                  }
                >
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{getInitials(user?.name)}</div>
          <p className="username">{user?.username || "..."}</p>
        </div>
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
