/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Button1 from "../../general/Button2";
import RowTray from "./TrayTableRow";

export default function TrayTable({
  data,
  handleClaim,
  addToDataClaim,
  title,
  dataToClaim,
  buttonText,
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

  const gridSize = ".3fr 1.5fr 0.3fr 0.5fr 1.2fr 0.3fr 0.8fr";

  const modelledStyle = {
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
    padding: "10px 10px 0",
    ".table": {
      border: "solid black",
      borderWidth: "1px 1px 0 1px",
      height: "calc(60vh - 61px)",
    },
    ".title": {
      color: "white",
    },
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      ".cell": {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
        padding: "5%",
        button: {
          cursor: "default",
        },
      },
    },
  };

  const headStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr ",
    height: "50px",
    width: "100%",
    backgroundColor: "#338DF1",
    ".backWrapper": {
      width: "40px",
      height: "40px",
      margin: "0 5% 0 2%",
      borderRadius: "100px",
      ":hover": {
        boxShadow: "inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff",
      },
      img: { width: "20px", filter: "invert(100%)" },
    },
    h3: {
      fontSize: "1.2rem",
      whiteSpace: "nowrap",
      color: "white",
      marginLeft: "50%",
    },
    ".centerTitle": {
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <div>
      <div css={headStyle}>
        <div className="flexCenter">
          <h3 className="bold title">{title}</h3>
        </div>
        <div className="flexCenter">
          <Button1
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
      <div css={modelledStyle}>
        <div className="table">
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
