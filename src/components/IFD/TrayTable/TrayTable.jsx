/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Button2 from "../../general/Button2";
import RowTray from "./TrayTableRow";

export default function TrayTable({
  data,
  handleClaim,
  addToDataClaim,
  title,
  dataToClaim,
  buttonText,
  selectAll,
  filter,
  filterInfo,
  actualData,
}) {
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
    ".head": {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr) ",
      height: "50px",
      width: "100%",
      backgroundColor: "#338DF1",
    },
    h3: {
      fontSize: "1.2rem",
      whiteSpace: "nowrap",
      color: "white",
    },
    ".wrapper": {
      padding: "10px 1% 0",
      border: "solid #D2D2D2",
      borderWidth: "0 1px 1px 1px",
      height: "calc(60vh - 50px)",
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
    ".table": {
      maxHeight: "calc(60vh - 111px)",
      overflowY: "auto",
      ".cell": { padding: "0 5%" },
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": { display: "none" },
      "*": { fontSize: "13px" },
    },
  };

  return (
    <div css={trayStyle}>
      <div className="head">
        <div />
        <div className="flexCenter">
          <h3 className="bold">{title}</h3>
        </div>
        <div className="flexCenter">
          <Button2
            onClick={handleClaim}
            text={buttonText || "Claim"}
            width="100px"
            bgColor="transparent"
            border="none"
            color="white"
            fontWeight="600"
            fontSize="14px"
            textMargin="0 0 0 6px"
            margin="0 0 0 3%"
            hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
            // img
            alt="claim"
            src={"https://img.icons8.com/material-outlined/24/null/move-up.png"}
            imgFilter="invert(100%) brightness(200%)"
          />
        </div>
      </div>
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
                    type="checkbox"
                    checked={
                      data.filter((x) => !x.owner).length ===
                        dataToClaim.length && data.length > 1
                    }
                    readOnly
                  />
                </div>
              );
            }
            return (
              <div key={title.text} className="flexCenter cell">
                <input
                  readOnly={title.key === "actions" || title.key === "progress"}
                  className="bold"
                  defaultValue={title.text}
                  onFocus={(e) => {
                    if (title.key === "actions" || title.key === "progress")
                      return;
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
          {data.map((row) => (
            <RowTray
              key={row.id}
              row={row}
              titles={titles}
              addToDataClaim={addToDataClaim}
              dataToClaim={dataToClaim}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
