/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import Select from "react-select";

const Row = React.memo(
  ({
    item,
    i,
    columns,
    handleChange,
    gridSize,
    handlePaste,
    copyToClipBoard,
    id,
    copyMulti,
    copied,
    changed,
    deleting,
    handleDelete,
  }) => {
    const rowId = `${id}${i}`;
    console.log(item.tag === "Already exists");

    const rowStyle = {
      transition: "all 200ms linear",
      display: "grid",
      gridTemplateColumns: gridSize,
      ":hover .id": {
        backgroundColor: deleting && "red !important",
      },
      "input, select": {
        backgroundColor:
          (item.tag === "Already exists" && "orange") ||
          (changed.includes(item.id) && "rgb(0, 188, 6)"),
        webkitTransition: "background-color 300ms linear",
        msTransition: "background-color 300ms linear",
        transition: "background-color 300ms linear",
        cursor: deleting && "pointer !important",
        width: "100%",
        lineHeight: "50px",
        border: "solid black",
        borderWidth: "1px 0 0 1px",
        textAlign: "center",
      },
      ".selectWrapper": {
        border: "solid black",
        borderWidth: "1px 0 0 1px",
        lineHeight: "50px",
        position: "relative",
        ".css-13cymwt-control, .css-t3ipsp-control": {
          cursor: "pointer",
          backgroundColor:
            (item.tag === "Already exists" && "orange") ||
            (changed.includes(item.id) && "rgb(0, 188, 6)"),
          webkitTransition: "background-color 300ms linear",
          msTransition: "background-color 300ms linear",
          transition: "background-color 300ms linear",
        },
        "*": {
          color: "black",
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

    const idWrapper = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: copied.includes(rowId) && "lightgray",
      cursor: deleting && "pointer !important",
      width: "100%",
      lineHeight: "50px",
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      textAlign: "center",
      span: {
        display: copyMulti ? "none" : "block",
      },
      img: {
        display: copyMulti ? "block" : "none",
        width: "50%",
      },
      ":hover": {
        img: {
          display: "block",
        },
        span: {
          display: "none",
        },
      },
    };

    return (
      <form
        css={rowStyle}
        onPaste={(e) => handlePaste(e, i, item.id)}
        id={rowId}
        onClick={(e) => handleDelete(e, item.id)}
      >
        {columns.map((x, y) => {
          if (x.key === "empty")
            return (
              <div
                onClick={() => copyToClipBoard(rowId)}
                key={`${i}${y}`}
                className="pointer id"
                css={idWrapper}
              >
                <span>{item.id}</span>
                <img src="https://img.icons8.com/external-becris-lineal-becris/64/null/external-copy-mintab-for-ios-becris-lineal-becris.png" />
              </div>
            );
          if (x.readOnly) {
            return (
              <input
                key={`${i}${y}`}
                className="default"
                value={item[x.key]}
                readOnly
                name={x.key}
              />
            );
          }
          return (
            <div key={`${i}${y}`} id={`${i}${y}`} className="selectWrapper">
              <Select
                value={{ label: item[x.key], value: item[x.key] }}
                onChange={(e) =>
                  handleChange(
                    { target: { name: x.key, value: e.label } },
                    item.id
                  )
                }
                inputId={x.key}
                options={x.source?.map((opt) => ({ label: opt, value: opt }))}
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
      </form>
    );
  }
);

export default Row;
