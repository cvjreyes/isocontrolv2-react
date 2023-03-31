/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import Button1 from "../../general/Button1";

export default function ModelledRow({
  addToDataClaim,
  returnToTray,
  dataToClaim,
  updatePipe,
  getMyPipes,
  gridSize,
  titles,
  row,
  i,
}) {
  const navigate = useNavigate();

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: gridSize,
    borderLeft: "1px solid black",
    height: "50px",
    ".cell": {
      border: "solid black",
      borderWidth: "0 1px 1px 0",
      padding: "0 2%",
      "*": { fontSize: "13px", textAlign: "center", padding: "10px 0" },
    },
    ".actions": { display: "flex", alignItems: "center" },
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
            <div
              key={title.key}
              className="flexCenter cell pointer"
              onClick={() => navigate(`/ifc/pipe/${row.id}`)}
            >
              <div>{row[title.key] || 0}%</div>
            </div>
          );
        } else if (title.key === "actions") {
          return (
            <div key={title.key} className="cell actions">
              <Button1
                text="P"
                width="40px"
                border="1px solid black"
                margin="2px 5px 0 0"
                bgColor={row.process && "#28A745"}
                onClick={() => updatePipe("process", row.process, row.id)}
              />
              <Button1
                text="I"
                width="40px"
                border="1px solid black"
                margin="2px 5px 0 0"
                bgColor={row.instrumentation && "#28A745"}
                onClick={() =>
                  updatePipe("instrumentation", row.instrumentation, row.id)
                }
              />
              <Button1
                text="V"
                width="40px"
                border="1px solid black"
                margin="2px 5px 0 0"
                bgColor={row.toValidate && "#FFCA42"}
                onClick={() => updatePipe("toValidate", row.toValidate, row.id)}
              />
              {row.status !== "Design" && (
                <Button1
                  text="R"
                  width="40px"
                  border="1px solid black"
                  margin="2px 5px 0 0"
                  onClick={() => returnToTray(i)}
                  bgColor="transparent"
                />
              )}
            </div>
          );
        }
        return (
          <div
            key={title.key}
            className="flexCenter cell pointer"
            onClick={() => navigate(`/ifc/pipe/${row.id}`)}
          >
            <div>{row[title.key] || "-"}</div>
          </div>
        );
      })}
    </div>
  );
}
