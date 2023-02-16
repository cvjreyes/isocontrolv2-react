import React from "react";
import { NavLink } from "react-router-dom";

export default function Titles() {
  return (
    <div className="titles">
      <div className="title">
        <h1>Progress</h1>
      </div>
      <div className="links">
        <div>
          <NavLink to="/progress/FEED">FEED</NavLink>
        </div>
        <div>
          <NavLink to="/progress/IFD">IFD</NavLink>
        </div>
        <div>
          {/* <NavLink to="/progress/IFC" aria-disabled="true" > */}
            IFC
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
}

const titlesStyle = {
  display: "grid",
  justifyContent: "center",
  marginTop: "3%",
  gridRowGap: "50%",
  ".title": {
    display: "grid",
    gridTemplateColumns: "3fr",
    justifySelf: "center",
  },
  ".links": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridColumnGap: "50%",
    marginLeft: "-90%",
  },
};
