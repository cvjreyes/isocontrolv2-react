/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { NavLink } from "react-router-dom";

import Button1 from "../general/Button1";

export default function Titles() {
  const links = [{ label: "FEED" }, { label: "IFD" } /*{ label: "IFC" }*/];

  const titlesStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${links.length}, 1fr)`,
    width: "fit-content",
    margin: "3% auto 0",
    ".boxlink": {
      margin: "0 3rem",
    },
  };

  return (
    <div css={titlesStyle}>
      {links.map((x, i) => {
        return (
          <div key={i} className="boxlink">
            <NavLink to={`/progress/${x.label}`}>
              <Button1
                text={x.label}
                bgColor="#338DF1"
                color="white"
                fontWeight="bold"
                bgHover="#66A9F4"
              />
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
