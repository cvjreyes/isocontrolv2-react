/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Button1 from "../../general/Button1";

export default function ModelledRow({ row, titles }) {
  return (
    <div className="grid">
      {titles.map((title) => {
        if (title.key === "claim") {
          return (
            <div key={title.key} className="flexCenter cell">
              <input type="checkbox" />
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
              />
              <Button1
                color={row.instrument && "white"}
                bgColor={row.instrument && "#28a745"}
                text="I"
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
