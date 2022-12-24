/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button1 from "../general/Button1";

export default function Navbar() {
  const { user, logout, isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) return;
  return (
    <div css={mainStyle}>
      <div>
        <NavLink to="/home">Home</NavLink>
      </div>
      {isLoggedIn && (
        <form onSubmit={logout} className="right">
          <span>{user.email}</span>
          <Button1
            text="Logout"
            className="logout pointer"
            bgColor="transparent"
            color="white"
            border="none"
            padding="none"
            margin="0 0 0 30px"
          />
        </form>
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
    span: { marginLeft: "30px" },
  },
  ".logout": {
    outline: "default",
    ":hover": {
      color: "#0070ED",
    },
  },
};
