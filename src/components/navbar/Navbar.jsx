/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getName } from "../../helpers/user";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const { user, logout, isLoggedIn } = useContext(AuthContext);

  const [isMenuOpen, setOpenMenu] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    console.log(1);
    setOpenMenu((prev) => !prev);
  };

  if (!isLoggedIn) return;
  return (
    <div css={mainStyle}>
      <div>
        <NavLink activeclassname="active" to="/">
          Home
        </NavLink>
        <NavLink activeclassname="active" to="/feed">
          FEED
        </NavLink>
        <NavLink activeclassname="active" to="/ifd">
          IFD
        </NavLink>
        <NavLink activeclassname="active" to="/ifc">
          IFC
        </NavLink>
      </div>
      {isLoggedIn && (
        <div className="right">
          <form onSubmit={toggleMenu}>
            <button className="userWrapper pointer removeStyle" tabIndex="0">
              <span>{getName(user.email)}</span>
              <img
                className="userIcon"
                alt="user"
                src="https://img.icons8.com/ios-glyphs/30/null/user--v1.png"
              />
            </button>
          </form>
          {isMenuOpen && (
            <Dropdown logout={logout} closeMenu={() => setOpenMenu(false)} />
          )}
        </div>
      )}
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
    postion: "relative",
  },
  ".userWrapper": {
    display: "flex",
    alignItems: "center",
    ":hover": {
      color: "#0070ED",
      img: {
        filter:
          "invert(36%) sepia(40%) saturate(7187%) hue-rotate(200deg) brightness(94%) contrast(103%)",
      },
    },
  },
  ".userIcon": {
    filter: "invert(100%)",
    width: "25px",
    marginLeft: "10px",
  },
};
