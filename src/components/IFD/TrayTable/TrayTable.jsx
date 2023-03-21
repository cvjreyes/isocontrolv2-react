/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import Loading from "react-loading";
import { AuthContext } from "../../../context/AuthContext";
import { userHasRoles } from "../../../helpers/user";

import NoResults from "../../general/NoResults";
import TrayHead from "./TrayHead";
import RowTray from "./TrayTableRow";

export default function TrayTable({
  data,
  handleClaim,
  handleUnclaim,
  addToDataClaim,
  title,
  dataToClaim,
  buttonText,
  selectAll,
  filter,
  filterInfo,
  orderBy,
}) {
  const { user } = useContext(AuthContext);

  const titles = [
    { text: "Claim", key: "claim" },
    { text: "Tag", key: "tag" },
    { text: "Type", key: "type" },
    { text: "Date", key: "updated_at" },
    { text: "User", key: "owner" },
    { text: "%", key: "progress" },
    { text: "Actions", key: "actions" },
  ];

  const gridSize = ".25fr 1.5fr 0.3fr 0.5fr 1.2fr 0.25fr 0.8fr";

  const trayStyle = {
    h3: {
      fontSize: "1.2rem",
      whiteSpace: "nowrap",
      color: "white",
    },
    ".wrapper": {
      padding: "10px 1% 0",
      border: "solid #D2D2D2",
      borderWidth: "0 1px 1px 1px",
      height: "calc(74vh - 50px)",
      "> .grid": { borderTop: "1px solid black" },
    },
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      height: "50px",
      borderLeft: "1px solid black",
      ".cell": {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
        button: {
          cursor: "default",
        },
        input: {
          width: "100%",
          lineHeight: "50px",
          border: "none",
          textAlign: "center",
        },
      },
    },
    ".itemsLength": {
      whiteSpace: "nowrap",
      marginRight: "1.5rem",
      minWidth: "150px",
      color: "white",
      textAlign: "center",
    },
    ".table": {
      paddingBottom: "200px",
      maxHeight: "calc(74vh - 111px)",
      overflowY: "auto",
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": { display: "none" },
      ".cell": { padding: "0 5%" },
      "*": { fontSize: "13px", textAlign: "center" },
    },
  };

  return (
    <div css={trayStyle}>
      <TrayHead
        handleClaim={handleClaim}
        buttonText={buttonText}
        title={title}
        data={data}
        orderBy={orderBy}
        handleUnclaim={handleUnclaim}
      />
      <div className="wrapper">
        <div className="grid">
          {titles.map((title) => {
            if (title.text === "Claim") {
              return (
                <div
                  key={title.text}
                  className="flexCenter cell pointer"
                  onClick={selectAll}
                >
                  <input
                    className="pointer"
                    type="checkbox"
                    checked={
                      userHasRoles(user, ["Speciality Lead"])
                        ? data.length === dataToClaim.length && data.length > 0
                        : data.filter((x) => !x.owner).length ===
                            dataToClaim.length && dataToClaim.length > 0
                    }
                    readOnly
                  />
                </div>
              );
            }
            return (
              <div key={title.text} className="flexCenter cell">
                <input
                  readOnly={title.key === "actions"}
                  className="bold"
                  defaultValue={title.text}
                  onFocus={(e) => {
                    if (title.key === "actions") return;
                    filter(title.key, "");
                    e.target.value = "";
                  }}
                  onBlur={(e) => {
                    if (!filterInfo[title.key]) {
                      e.target.value = e.target.defaultValue;
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.target.value = e.target.defaultValue;
                      e.target.blur();
                      filter(title.key, "");
                    }
                  }}
                  onChange={(e) => filter(title.key, e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <div className="table">
          {data ? (
            data.length > 0 ? (
              data.map((row) => (
                <RowTray
                  key={row.id}
                  row={row}
                  titles={titles}
                  addToDataClaim={addToDataClaim}
                  dataToClaim={dataToClaim}
                  user={user}
                />
              ))
            ) : (
              <NoResults />
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
