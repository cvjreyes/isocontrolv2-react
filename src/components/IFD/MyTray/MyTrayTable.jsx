/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import MyTrayRow from "./MyTrayRow";

export default function MyTrayTable({ data, addToDataClaim, dataToClaim }) {
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

  const gridSize = ".3fr 1.5fr 0.3fr 0.5fr 0.5fr 0.5fr 0.3fr 1fr 0.8fr";

  const modelledStyle = {
    border: "solid black",
    borderWidth: "1px 0 0 1px",
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      ".cell": {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
        padding: "5%",
      },
    },
  };

  return (
    <div css={modelledStyle}>
      <div className="grid">
        {titles.map((title) => {
          return (
            <div key={title.text} className="flexCenter cell">
              <h4 className="bold">{title.text}</h4>
            </div>
          );
        })}
      </div>
      {data.map((row) => (
        <MyTrayRow
          key={row.id}
          row={row}
          titles={titles}
          addToDataClaim={addToDataClaim}
          dataToClaim={dataToClaim}
        />
      ))}
    </div>
  );
}
