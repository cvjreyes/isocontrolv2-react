/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Select from "react-select";

export default function AddRow({
  columns,
  row,
  i,
  gridSize,
  handleChange,
  handleSubmit,
  handlePaste,
}) {
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: gridSize,
    borderRight: "1px solid black",
    "input, select": {
      width: "100%",
      lineHeight: "50px",
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      textAlign: "center",
      backgroundColor: row.tag === "Already exists" && "orange",
    },
    ".selectWrapper": {
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      lineHeight: "50px",
      position: "relative",
      ".css-13cymwt-control, .css-t3ipsp-control": {
        cursor: "pointer",
        backgroundColor: row.tag === "Already exists" && "orange",
      },
      "*": {
        color: "#383838",
        border: "none",
      },
      ".css-1nmdiq5-menu": {
        lineHeight: "normal",
        whiteSpace: "nowrap",
        minWidth: "fit-content",
      },
      img: {
        position: "absolute",
        width: "10px",
        right: "3px",
        top: "calc(50% - 5px)",
      },
    },
  };

  return (
    <form
      css={rowStyle}
      onSubmit={handleSubmit}
      onPaste={(e) => handlePaste(e, i)}
    >
      {columns.map((col, y) => {
        if (col.key === "empty")
          return (
            <div key={`${i}${y}`} css={idWrapper}>
              <span>{i + 1}</span>
            </div>
          );
        if (col.readOnly) {
          return (
            <input
              key={`${i}${y}`}
              className="default"
              value={row[col.key]}
              name={col.key}
              readOnly
              onChange={() => {
                return;
              }}
            />
          );
        }
        return (
          <div key={`${i}${y}`} id={`${i}${y}`} className="selectWrapper">
            <Select
              value={{ label: row[col.key], value: row[col.key] }}
              onChange={(e) =>
                handleChange({ target: { name: col.key, value: e.label } }, i)
              }
              inputId={col.key}
              options={col.source?.map((opt) => ({ label: opt, value: opt }))}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              closeMenuOnScroll={true}
            />
            <img src="https://img.icons8.com/ultraviolet/40/null/circled-chevron-down.png" />
          </div>
        );
      })}
      <button className="none" />
    </form>
  );
}

const idWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  lineHeight: "50px",
  border: "solid black",
  borderWidth: "1px 0 0 1px",
  textAlign: "center",
};
