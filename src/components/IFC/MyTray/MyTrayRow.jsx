/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Button1 from "../../general/Button1";

export default function ModelledRow({
  row,
  titles,
  addToDataClaim,
  dataToClaim,
  handleClick,
  gridSize,
}) {
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: gridSize,
    borderLeft: "1px solid black",
    ".cell": {
      border: "solid black",
      borderWidth: "0 1px 1px 0",
      padding: "0 2%",
      "*": { fontSize: "13px", textAlign: "center" },
    },
  };

  return (
    <div css={rowStyle}>
      {titles.map((title) => {
        if (title.key === "claim") {
          return (
            <div
              key={title.key}
              className="cell flexCenter pointer"
              onClick={() => addToDataClaim(row.id)}
            >
              <input
                type="checkbox"
                checked={dataToClaim.includes(row.id)}
                onChange={() => addToDataClaim(row.id)}
              />
            </div>
          );
        } else if (title.key === "progress") {
          return (
            <div key={title.key} className="flexCenter cell">
              <div>{row[title.key] || 0}%</div>
            </div>
          );
        } else if (title.key === "actions") {
          return (
            <div key={title.key} className="flexCenter cell">
              <Button1
                color={row.valve && "white"}
                bgColor={row.valve && "#28a745"}
                text="V"
                border="1px solid black"
                width="30%"
                padding="10px 0"
                onClick={(e) => handleClick(e, row.id)}
                name="valve"
              />
              <Button1
                color={row.instrument && "white"}
                bgColor={row.instrument && "#28a745"}
                text="I"
                border="1px solid black"
                width="30%"
                padding="10px 0"
                margin="0 0 0 10px"
                onClick={(e) => handleClick(e, row.id)}
                name="instrument"
              />
              <Button1
                color={row.NA && "white"}
                bgColor={row.NA && "#28a745"}
                text="N/A"
                border="1px solid black"
                width="30%"
                padding="10px 0"
                margin="0 0 0 10px"
                onClick={(e) => handleClick(e, row.id)}
                name="NA"
              />
            </div>
          );
        }
        return (
          <div key={title.key} className="flexCenter cell">
            <div>{row[title.key] || "-"}</div>
          </div>
        );
      })}
    </div>
  );
}
