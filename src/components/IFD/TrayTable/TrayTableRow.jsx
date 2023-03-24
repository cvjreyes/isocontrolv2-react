/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { userHasRoles } from "../../../helpers/user";
import Button1 from "../../general/Button1";

export default function TrayTableRow({
  row,
  titles,
  addToDataClaim,
  dataToClaim,
}) {
  const { user } = useContext(AuthContext);

  return (
    <div className="grid">
      {titles.map((title) => {
        if (title.key === "claim") {
          return (
            <div
              key={title.key}
              className="cell flexCenter pointer"
              onClick={() =>
                (!row.owner || userHasRoles(user, ["Speciality Lead"])) &&
                addToDataClaim(row.id)
              }
            >
              <input
                disabled={
                  (!userHasRoles(user, ["Speciality Lead"]) && row.owner) ||
                  row.inIFC
                }
                type="checkbox"
                checked={dataToClaim.includes(row.id)}
                onChange={() => addToDataClaim(row.id)}
                className="pointer"
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
              />
              <Button1
                color={row.instrument && "white"}
                bgColor={row.instrument && "#28a745"}
                text="I"
                border="1px solid black"
                width="30%"
                margin="0 0 0 10px"
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
