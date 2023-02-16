/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { NavLink } from "react-router-dom";

export default function Titles() {
  const links = [{ label: "FEED" }, { label: "IFD" }, { label: "IFC" }];

  const titlesStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${links.length}, 1fr)`,
    textAlign: "center",
    width: "fit-content",
    margin: "3% auto 0",
    ".link": {
      margin:"0 2rem"
    }

  };

  return (
    <div css={titlesStyle}>
      {links.map((x, i) => {
        return (
          <div key={i} className="link" >
            <NavLink to={`/progress/${x.label}`}>{x.label}</NavLink>
          </div>
        );
      })}
    </div>
  );
}
