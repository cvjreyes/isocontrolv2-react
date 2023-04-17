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
  editable,
  dataToClaim,
  addToDataClaim,
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const rowStyle = { backgroundColor: row.isBlocked ? "lightgray" : "" };
  const clickable =
    editable &&
    !row.isBlocked &&
    (!row.process_owner ||
      (row.process_owner && userHasRoles(user, ["Speciality Lead"])));

  const isProcessOwner = row.process_owner === user.name;
  let navigateTo = `/ifc/pipe/${row.id}`;
  isProcessOwner && (navigateTo += "/process");

  return (
    <div className="grid" css={rowStyle}>
      {titles.map((title) => {
        if (title.key === "claim") {
          return (
            <div
              key={title.key}
              className="cell flexCenter pointer"
              onClick={() => clickable && addToDataClaim(row.id)}
            >
              <input
                disabled={!clickable}
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
              onClick={() => navigate(navigateTo)}
            >
              <div>{row[title.key] || 0}%</div>
            </div>
          );
        } else if (title.key === "actions") {
          const processColor = row.process
            ? "lightgray"
            : typeof row.is_process_accepted === "object"
            ? "transparent"
            : row.is_process_accepted
            ? "#28A745"
            : !row.is_process_accepted && "red";

          return (
            <div key={title.key} className="cell actions">
              <Button2
                text="P"
                width="40px"
                border="1px solid black"
                margin="2px 5px 0 0"
                bgColor={processColor}
                className="default"
              />
              <Button2
                text="I"
                width="40px"
                border="1px solid black"
                margin="2px 5px 0 0"
                bgColor={row.instrumentation && "lightgray"}
                className="default"
              />
            </div>
          );
        }
        return (
          <div
            key={title.key}
            className="flexCenter cell pointer"
            onClick={() => navigate(navigateTo)}
          >
            <div>
              {title.key === "revision"
                ? `R${row[title.key]}`
                : row[title.key] || "-"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
