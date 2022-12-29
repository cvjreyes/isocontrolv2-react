/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ title1, title2, links1, links2 }) {
  return (
    <div css={sidebarStyle}>
      <div className="section">
        <p className="bold">{title1}</p>

        <div>
          {links1.map((link) => (
            <NavLink
              exact="true"
              style={({ isIt }) => isIt && "active"}
              key={link.text}
              to={link.to}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="section">
        <p className="bold">{title2}</p>
        <div>
          {links2.map((link) => (
            <NavLink
              exact="true"
              style={({ isIt }) => isIt && "active"}
              key={link.text}
              to={link.to}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

const sidebarStyle = {
  display: "flex",
  flexDirection: "column",
  width: "160px",
  borderRadius: "20px",
  padding: "1.5rem 0",
  WebkitBoxShadow: "5px 5px 10px #f0f0f0, -5px -5px 10px #ffffff",
  MozBoxShadow: "5px 5px 10px #f0f0f0, -5px -5px 10px #ffffff",
  boxShadow: "5px 5px 10px #f0f0f0, -5px -5px 10px #ffffff",
  ".section": {
    margin: ".5rem 0",
    div: {
      width: "100%",
      ".active": {
        backgroundColor: "#006fed69",
      },
    },
    "p, a": {
      fontSize: "14px",
    },
  },
  ".bold": {
    margin: "0 0 .75rem 0",
    padding: "0 20px",
  },
  a: {
    textDecoration: "none",
    color: "inherit",
    padding: ".25rem 20px",
    display: "block",
    ":hover": {
      backgroundColor: "lightgray",
    },
  },
};
