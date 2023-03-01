/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import { getName } from "../../helpers/user";
import UserDropdown from "./UserDropdown";
import NotificationsDropDown from "./NotificationsDropDown";

export default function Navbar() {
  const { user, logout, isLoggedIn } = useContext(AuthContext);
  let location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [isNotificationsMenuOpen, setOpenNotificationsMenu] = useState(false);
  const [isUserMenuOpen, setOpenUserMenu] = useState(false);

  useEffect(() => {
    getNotifications();
    const interval = setInterval(() => {
      getNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) setOpenUserMenu(false);
  }, [isLoggedIn]);

  useEffect(() => {
    setOpenUserMenu(false);
    setOpenNotificationsMenu(false);
  }, [location]);

  const getNotifications = async () => {
    console.log("updating notifications");
    const { body } = await api("get", "/notifications/get_last_10");
    setNotifications(body);
  };

  const toggleUserMenu = (e) => {
    e.preventDefault();
    setOpenUserMenu(!isUserMenuOpen);
    if (isNotificationsMenuOpen) setOpenNotificationsMenu(false);
  };

  const toggleNotificationsMenu = (e) => {
    e.preventDefault();
    setOpenNotificationsMenu(!isNotificationsMenuOpen);
    if (isUserMenuOpen) setOpenUserMenu(false);
  };

  if (!isLoggedIn) return;
  return (
    <div css={mainStyle}>
      <div>
        <NavLink style={({ isIt }) => isIt && "active"} to="/">
          Home
        </NavLink>
        <NavLink style={({ isIt }) => isIt && "active"} to="/feed">
          FEED
        </NavLink>
        <NavLink style={({ isIt }) => isIt && "active"} to="/ifd">
          IFD
        </NavLink>
        <NavLink style={({ isIt }) => isIt && "active"} to="/ifc">
          IFC
        </NavLink>
        <NavLink style={({ isIt }) => isIt && "active"} to="/progress">
          Progress
        </NavLink>
        <NavLink style={({ isIt }) => isIt && "active"} to="/total_lines">
          Totals
        </NavLink>
      </div>
      <div className="right">
        <form
          className="notificationsWrapper"
          onSubmit={toggleNotificationsMenu}
        >
          <button className="bellWrapper removeStyle flexCenter pointer">
            {user.last_opened_notifications < notifications[0]?.created_at && (
              <div className="new_notification" />
            )}
            <img
              className="invert"
              alt="bell"
              src="https://img.icons8.com/material-sharp/24/null/bell.png"
            />
          </button>
          {isNotificationsMenuOpen && [
            <NotificationsDropDown
              closeMenu={() => setOpenNotificationsMenu(false)}
              notifications={notifications}
              user={user}
              key="1"
            />,
            <div
              className="clickAway"
              onClick={toggleNotificationsMenu}
              key="2"
            />,
          ]}
        </form>
        <form onSubmit={toggleUserMenu}>
          <button className="userWrapper pointer removeStyle" tabIndex="0">
            {user.email && <span>{getName(user.email)}</span>}
            <img
              className="userIcon"
              alt="user"
              src="https://img.icons8.com/ios-glyphs/30/null/user--v1.png"
            />
          </button>
          {isUserMenuOpen && [
            <UserDropdown
              user={user}
              logout={logout}
              closeMenu={() => setOpenUserMenu(false)}
              key="1"
            />,
            <div className="clickAway" onClick={toggleUserMenu} key="2" />,
          ]}
        </form>
      </div>
    </div>
  );
}

const mainStyle = {
  height: "50px",
  width: "100vw",
  backgroundColor: "#383838",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 2%",
  zIndex: 2,
  position: "relative",
  ".active": {
    color: "#0070ED",
  },
  a: {
    color: "white",
    textDecoration: "none",
    marginRight: "30px",
    ":hover": {
      color: "#0070ED",
    },
  },
  ".right": {
    display: "flex",
    alignItems: "center",
    ".notificationsWrapper": {
      zIndex: 3,
      margin: "0 50px 0 -50px",
      ".bellWrapper": {
        position: "relative",
        ".new_notification": {
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#0070ED",
          position: "absolute",
          top: "0px",
          left: "11px",
          zIndex: 6,
        },
      },
      img: {
        zIndex: 5,
        width: "25px",
        heght: "25px",
        ":hover": {
          filter:
            "invert(36%) sepia(40%) saturate(7187%) hue-rotate(200deg) brightness(94%) contrast(103%)",
        },
      },
    },
    ".userWrapper": {
      zIndex: 3,
      display: "flex",
      alignItems: "center",
      position: "relative",
      span: { color: "white" },
      ":hover": {
        span: { color: "#0070ED" },
        img: {
          filter:
            "invert(36%) sepia(40%) saturate(7187%) hue-rotate(200deg) brightness(94%) contrast(103%)",
        },
      },
      ".userIcon": {
        filter: "invert(100%)",
        width: "25px",
        marginLeft: "10px",
      },
    },
    ".clickAway": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 2,
    },
  },
};
