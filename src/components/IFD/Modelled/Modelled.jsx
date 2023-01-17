/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";

export default function Modelled() {
  const gridSize = ".5fr 1fr 1fr 1fr 1fr 1fr 1fr";
  const titles = [
    "Claim",
    "Tag",
    "Type",
    "Date",
    "User",
    "Progress",
    "Actions",
  ];

  const modelledStyle = {
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      div: {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
        padding: "5%",
      },
    },
  };


  return (
    <div>
      <div css={modelledStyle}>
        <div>head</div>
        <div className="grid">
          {titles.map((title) => {
            return (
              <div key={title} className="flexCenter">
                <h4 className="bold">{title}</h4>
              </div>
            );
          })}
        </div>
        
        <div>table</div>
      </div>
    </div>
  );
}
