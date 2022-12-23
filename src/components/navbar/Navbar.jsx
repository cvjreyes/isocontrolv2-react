/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div css={mainStyle}>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
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
  padding: "0 2%",
  a: {
    color: "white",
    textDecoration: "none",
    marginRight: "30px",
    ":hover": {
      color: "#0070ED",
    },
  },
};
