/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";
import Countup from "react-countup";

import "./home.css";

export default function Square({ to, text, subtext, num, className }) {
  return (
    <Link to={to} css={itemStyle} className={`test ${className}`}>
      <p className="big">{text}</p>
      <p className="small">{subtext}</p>
      {/* <p className="big">{num}%</p> */}
      <div>
        <Countup end={num} decimals={2} className="big" />
        <span className="big">%</span>
      </div>
    </Link>
  );
}

const itemStyle = {
  textDecoration: "none",
  padding: "10px",
  borderRadius: "20px",
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
