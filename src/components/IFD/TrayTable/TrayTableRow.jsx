/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Button1 from "../general/Button1";

export default function TrayTableRow({
  row,
  titles,
  addToDataClaim,
  dataToClaim,
}) {
  return (
    <div className="grid">
      {titles.map((title) => {
        if (title.key === "claim") {
          return (
            <div
              key={title.key}
              className="cell flexCenter pointer"
              onClick={() => !row.owner && addToDataClaim(row.id)}
            >
              <input
                disabled={row.owner}
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
                width="45%"
              />
              <Button1
                color={row.instrument && "white"}
                bgColor={row.instrument && "#28a745"}
                text="I"
                border="1px solid black"
                width="45%"
                margin="0 0 0 10px"
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
