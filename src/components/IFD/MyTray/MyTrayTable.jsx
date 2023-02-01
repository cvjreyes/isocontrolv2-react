/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Loading from "react-loading";

import NoResults from "../../general/NoResults";
import MyTrayRow from "./MyTrayRow";

export default function MyTrayTable({
  data,
  addToDataClaim,
  dataToClaim,
  handleClick,
  changed,
  selectAll,
}) {
  const titles = [
    { text: "Claim", key: "claim" },
    { text: "Tag", key: "tag" },
    { text: "Type", key: "type" },
    { text: "Date", key: "updated_at" },
    { text: "Current Tray", key: "status" },
    { text: "Next Step", key: "next_step" },
    { text: "%", key: "progress" },
    { text: "IsoTracker", key: "in_isotracker" },
    { text: "Actions", key: "actions" },
  ];

  const gridSize = ".3fr 1.5fr 0.3fr 0.5fr 0.5fr 0.5fr 0.3fr .5fr 0.8fr";

  const modelledStyle = {
    padding: "10px 1% 0",
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      height: "50px",
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      ".cell": {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
      },
    },
    ".table": {
      paddingBottom: "200px",
      height: "calc(60vh - 111px)",
      overflowY: "auto",
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
  };

  return (
    <div css={modelledStyle}>
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
                    data.length === dataToClaim.length && data.length > 0
                  }
                  readOnly
                />
              </div>
            );
          }
          return (
            <div key={title.text} className="flexCenter cell">
              <h4 className="bold">{title.text}</h4>
            </div>
          );
        })}
      </div>
      <div className="table">
        {data ? (
          data.length > 0 ? (
            data.map((row) => (
              <MyTrayRow
                key={row.id}
                row={row}
                titles={titles}
                addToDataClaim={addToDataClaim}
                dataToClaim={dataToClaim}
                handleClick={handleClick}
                changed={changed}
                gridSize={gridSize}
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
  );
}
