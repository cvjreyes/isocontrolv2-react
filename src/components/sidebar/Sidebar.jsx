/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ data }) {
  return (
    <div css={sidebarStyle}>
      <div className="fakeHeader" />
      {data.map(({ title, links }) => (
        <div className="section" key={title}>
          <p className="bold">{title}</p>
          {links.map((link) => {
            return (
              <NavLink
                exact="true"
                style={({ isIt }) => isIt && "active"}
                key={link.text}
                to={link.to}
              >
                {link.text}
              </NavLink>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const sidebarStyle = {
  border: "solid #D2D2D2",
  borderWidth: "0 0 1px 1px",
  display: "flex",
  flexDirection: "column",
  padding: "0 0 1.5rem",
  ".section": {
    margin: ".5rem 0",
    ".active": {
      backgroundColor: "#66A9F4",
    },
    "p, a": {
      fontSize: "14px",
      lineHeight: "20px",
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
