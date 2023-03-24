/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { userHasRoles } from "../../../helpers/user";
import Button2 from "../../general/Button2";

export default function TrayTableRow({
  row,
  titles,
  addToDataClaim,
  dataToClaim,
  updatePipe,
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
                disabled={!userHasRoles(user, ["Speciality Lead"]) && row.owner}
                type="checkbox"
                checked={dataToClaim.includes(row.id)}
                onChange={() => addToDataClaim(row.id)}
                className="pointer"
              />
            </div>
          );
        } else if (title.key === "progress") {
          return (
            <div
              key={title.key}
              className="flexCenter cell pointer"
              onClick={() => navigate(`/pipe/${row.id}`)}
            >
              <div>{row[title.key] || 0}%</div>
            </div>
          );
        } else if (title.key === "actions") {
          return (
            <div key={title.key} className="flexCenter cell">
              <Button2
                text="P"
                width="50px"
                border="1px solid black"
                margin="2px 10px 0"
                bgColor={row.process && "#28A745"}
                onClick={() => updatePipe("process", row.process, row.id)}
              />
              <Button2
                text="I"
                width="50px"
                border="1px solid black"
                margin="2px 10px 0"
                bgColor={row.instrumentation && "#28A745"}
                onClick={() =>
                  updatePipe("instrumentation", row.instrumentation, row.id)
                }
              />
            </div>
          );
        }
        return (
          <div
            key={title.key}
            className="flexCenter cell pointer"
            onClick={() => navigate(`/ifc/pipe/${row.id}`)}
          >
            <div>
              {title.key === "revision"
                ? `*R${row[title.key]}`
                : row[title.key] || "-"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
