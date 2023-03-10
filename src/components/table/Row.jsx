/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState } from "react";
import Copied from "../../modals/Copied";
import DropdownCell from "./DropdownCell";

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
    isViewMode,
  }) => {
    const rowId = `${id}${i}`;

    const [showCopied, setShowCopied] = useState(false);

    const showCopiedFunc = () => {
      if (!showCopied) {
        setShowCopied(true);
        setTimeout(() => {
          setShowCopied(false);
        }, 1200);
      }
      return true;
    };

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
          (changed.includes(item.id) && "#2fc1383b") ||
          (((item.ifd_status && item.ifd_status !== "FEED_ESTIMATED") ||
            item.trashed ||
            (item.feed_id &&
              !item.status.toLowerCase().includes("estimated"))) &&
            "lightgray"),
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
        cursor: "pointer",
        border: "solid black",
        borderWidth: "1px 0 0 1px",
        lineHeight: "50px",
        position: "relative",
        ".css-13cymwt-control, .css-t3ipsp-control": {
          webkitTransition: "background-color 300ms linear",
          msTransition: "background-color 300ms linear",
          transition: "background-color 300ms linear",
        },
        "*": {
          color: "black",
          border: "none",
          cursor: "pointer",
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
      position: "relative",
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
        onClick={(e) =>
          (!item.ifd_status || item.ifd_status === "FEED_ESTIMATED") &&
          handleDelete(e, item.id, item.trashed, item.tag)
        }
      >
        {columns.map((x, y) => {
          if (x.key === "empty")
            return (
              <div
                onClick={() => showCopiedFunc() && copyToClipBoard(rowId)}
                key={`${i}${y}`}
                className="pointer id"
                css={idWrapper}
              >
                <span>{item.id}</span>
                <img src="https://img.icons8.com/external-becris-lineal-becris/64/null/external-copy-mintab-for-ios-becris-lineal-becris.png" />
                {showCopied && <Copied />}
              </div>
            );
          if (
            x.readOnly ||
            (isViewMode && x.key !== "status" && x.key !== "owner")
          ) {
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
            <DropdownCell
              key={`${i}${y}`}
              i={i}
              y={y}
              item={item}
              x={x}
              changed={changed}
              deleting={deleting}
              handleChange={handleChange}
            />
          );
        })}
      </form>
    );
  }
);

export default Row;
