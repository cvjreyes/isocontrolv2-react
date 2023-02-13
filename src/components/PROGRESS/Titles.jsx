import React from "react";
import { NavLink } from "react-router-dom";

export default function Titles() {
  return (
    <div>
      <NavLink to="/progress/feed">FEED</NavLink>
      <NavLink to="/progress/ifd">IFD</NavLink>
    </div>
  );
}
