/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";

import "./home.css";

export default function Square({ to, text, subtext, num }) {
  return (
    <Link to={to} css={itemStyle} className="test">
      <p className="big">{text}</p>
      <p className="small">{subtext}</p>
      <p className="big">{num}%</p>
    </Link>
  );
}

const itemStyle = {
  textDecoration: "none",
  padding: "10px",
  borderRadius: "20px",
  color: "white",
  textAlign: "center",
  margin: "0 5%",
  width: "310px",
  height: "220px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  ":hover": {
    backgroundColor: "lightblue",
  },
  ".big": {
    margin: "10px 0",
    fontSize: "35px",
    letterSpacing: "1px",
    fontWeight: 700,
  },
  ".small": {
    fontSize: "12px",
  },
};
